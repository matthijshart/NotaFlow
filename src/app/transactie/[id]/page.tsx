'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { saveAs } from 'file-saver'
import ProgressBar from '@/components/ProgressBar'
import Step1ObjectPartijen from '@/components/Step1ObjectPartijen'
import Step2Kenmerken from '@/components/Step2Kenmerken'
import Step3Voorwaarden from '@/components/Step3Voorwaarden'
import Step4Clausules from '@/components/Step4Clausules'
import Step5Preview from '@/components/Step5Preview'
import Step1Partners from '@/components/samenleving/Step1Partners'
import Step2Vermogen from '@/components/samenleving/Step2Vermogen'
import Step3Regelingen from '@/components/samenleving/Step3Regelingen'
import Step1Gebouw from '@/components/splitsing/Step1Gebouw'
import Step2SplitsingKenmerken from '@/components/splitsing/Step2Kenmerken'
import {
  TransactieFormData,
  TransactieClausuleData,
  ClausuleData,
  DocumentType,
  KoopovereenkomstFormData,
  SamenlevingsovereenkomstFormData,
  SplitsingsakteFormData,
  getDefaultFormData,
  documentTypeLabels,
} from '@/lib/types'
import { shouldClausuleBeActive } from '@/lib/clausule-engine'
import { generateDocx } from '@/lib/docx-export'

const stepsConfig: Record<DocumentType, string[]> = {
  koopovereenkomst: ['Object & partijen', 'Kenmerken', 'Ontbindende voorwaarden', 'Clausules', 'Preview & export'],
  samenlevingsovereenkomst: ['Partners', 'Vermogen & woning', 'Regelingen', 'Clausules', 'Preview & export'],
  splitsingsakte: ['Gebouw & eigenaar', 'Kenmerken', 'Clausules', 'Preview & export', ''],
}

// Splitsingsakte has 4 steps (no step 3 separate from clausules)
const totalSteps: Record<DocumentType, number> = {
  koopovereenkomst: 5,
  samenlevingsovereenkomst: 5,
  splitsingsakte: 4,
}

// Which step triggers clausule sync (the step before clausules)
const clausuleSyncStep: Record<DocumentType, number> = {
  koopovereenkomst: 3,
  samenlevingsovereenkomst: 3,
  splitsingsakte: 2,
}

// Which step shows clausules
const clausuleStep: Record<DocumentType, number> = {
  koopovereenkomst: 4,
  samenlevingsovereenkomst: 4,
  splitsingsakte: 3,
}

// Which step shows preview
const previewStep: Record<DocumentType, number> = {
  koopovereenkomst: 5,
  samenlevingsovereenkomst: 5,
  splitsingsakte: 4,
}

export default function TransactiePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [step, setStep] = useState(1)
  const [documentType, setDocumentType] = useState<DocumentType>('koopovereenkomst')
  const [formData, setFormData] = useState<TransactieFormData>(getDefaultFormData('koopovereenkomst'))
  const [transactieClausules, setTransactieClausules] = useState<TransactieClausuleData[]>([])
  const [alleClausules, setAlleClausules] = useState<ClausuleData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetch(`/api/transacties/${id}`).then(r => r.json()).then((transactie) => {
      const docType = (transactie.document_type || 'koopovereenkomst') as DocumentType
      setDocumentType(docType)

      // Parse extra_data for non-koopovereenkomst types
      const extraData = transactie.extra_data ? JSON.parse(transactie.extra_data) : {}

      if (docType === 'koopovereenkomst') {
        setFormData({
          document_type: 'koopovereenkomst',
          type_object: transactie.type_object,
          adres: transactie.adres,
          kadastrale_aanduiding: transactie.kadastrale_aanduiding,
          verkoper_naam: transactie.verkoper_naam,
          koper_naam: transactie.koper_naam,
          koopprijs: transactie.koopprijs,
          leveringsdatum: transactie.leveringsdatum,
          vve: transactie.vve,
          erfpacht: transactie.erfpacht,
          erfpacht_type: transactie.erfpacht_type,
          bouwjaar_voor_1992: transactie.bouwjaar_voor_1992,
          bouwtechnische_keuring: transactie.bouwtechnische_keuring,
          energielabel: transactie.energielabel,
          financieringsvoorbehoud: transactie.financieringsvoorbehoud,
          financieringstermijn_weken: transactie.financieringstermijn_weken,
          nhg: transactie.nhg,
          bouwkundig_voorbehoud: transactie.bouwkundig_voorbehoud,
          huisvestingsvergunning: transactie.huisvestingsvergunning,
        })
      } else if (docType === 'samenlevingsovereenkomst') {
        const defaults = getDefaultFormData('samenlevingsovereenkomst') as SamenlevingsovereenkomstFormData
        setFormData({ ...defaults, ...extraData, document_type: 'samenlevingsovereenkomst' })
      } else if (docType === 'splitsingsakte') {
        const defaults = getDefaultFormData('splitsingsakte') as SplitsingsakteFormData
        setFormData({
          ...defaults,
          ...extraData,
          document_type: 'splitsingsakte',
          adres: extraData.adres || transactie.adres || '',
          kadastrale_aanduiding: extraData.kadastrale_aanduiding || transactie.kadastrale_aanduiding || '',
          erfpacht: extraData.erfpacht ?? transactie.erfpacht ?? false,
          erfpacht_type: extraData.erfpacht_type || transactie.erfpacht_type || 'eeuwigdurend',
        })
      }

      setTransactieClausules(transactie.clausules || [])

      // Load clausules for this document type
      fetch(`/api/clausules?document_type=${docType}`).then(r => r.json()).then(setAlleClausules)

      setLoading(false)
    })
  }, [id])

  function handleChange(partial: Partial<TransactieFormData>) {
    setFormData(prev => ({ ...prev, ...partial } as TransactieFormData))
  }

  const saveTransaction = useCallback(async (data: TransactieFormData) => {
    setSaving(true)

    if (data.document_type === 'koopovereenkomst') {
      const { document_type, ...rest } = data as KoopovereenkomstFormData
      await fetch(`/api/transacties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_type, ...rest }),
      })
    } else {
      // Store document-type-specific data in extra_data
      const { document_type, ...rest } = data
      await fetch(`/api/transacties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_type,
          extra_data: rest,
          // Also store adres in main field for display
          ...(('adres' in rest) && { adres: (rest as Record<string, unknown>).adres }),
        }),
      })
    }

    setSaving(false)
  }, [id])

  const syncClausules = useCallback(async (data: TransactieFormData) => {
    const activeIds = alleClausules
      .filter(c => shouldClausuleBeActive(c, data))
      .map(c => c.id)

    const res = await fetch(`/api/transacties/${id}/clausules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activeClausuleIds: activeIds }),
    })
    const updated = await res.json()
    setTransactieClausules(updated)
  }, [id, alleClausules])

  const maxSteps = totalSteps[documentType]

  async function handleNext() {
    await saveTransaction(formData)

    if (step === clausuleSyncStep[documentType]) {
      await syncClausules(formData)
    }

    setStep(prev => Math.min(prev + 1, maxSteps))
  }

  function handleBack() {
    setStep(prev => Math.max(prev - 1, 1))
  }

  async function handleToggleClausule(tcId: string, actief: boolean) {
    await fetch(`/api/transacties/${id}/clausules`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tcId, actief }),
    })
    setTransactieClausules(prev =>
      prev.map(tc => tc.id === tcId ? { ...tc, actief } : tc)
    )
  }

  async function handleEditClausule(tcId: string, tekst: string) {
    await fetch(`/api/transacties/${id}/clausules`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tcId, aangepaste_tekst: tekst }),
    })
    setTransactieClausules(prev =>
      prev.map(tc => tc.id === tcId ? { ...tc, aangepaste_tekst: tekst } : tc)
    )
  }

  async function handleAddClausule(clausuleId: string) {
    const activeIds = [
      ...transactieClausules.map(tc => tc.clausule_id),
      clausuleId,
    ]
    const res = await fetch(`/api/transacties/${id}/clausules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activeClausuleIds: activeIds }),
    })
    const updated = await res.json()
    setTransactieClausules(updated)
  }

  async function handleExport() {
    setExporting(true)
    try {
      const blob = await generateDocx(formData, transactieClausules)
      const label = documentTypeLabels[documentType].toLowerCase()
      const adres = ('adres' in formData ? formData.adres : '') || 'concept'
      const fileName = `${label}-${adres}.docx`
        .replace(/[^a-zA-Z0-9.\-_ ]/g, '')
        .replace(/\s+/g, '-')
      saveAs(blob, fileName)
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Laden...</p>
      </div>
    )
  }

  const activeStepLabels = stepsConfig[documentType].filter(s => s !== '')

  function renderCurrentStep() {
    const isClausuleStep = step === clausuleStep[documentType]
    const isPreviewStep = step === previewStep[documentType]

    if (isClausuleStep) {
      return (
        <Step4Clausules
          formData={formData}
          transactieClausules={transactieClausules}
          alleClausules={alleClausules}
          onToggleClausule={handleToggleClausule}
          onEditClausule={handleEditClausule}
          onAddClausule={handleAddClausule}
        />
      )
    }

    if (isPreviewStep) {
      return (
        <Step5Preview
          formData={formData}
          transactieClausules={transactieClausules}
          onExport={handleExport}
          exporting={exporting}
        />
      )
    }

    // Document-type-specific steps
    if (documentType === 'koopovereenkomst') {
      const koop = formData as KoopovereenkomstFormData
      if (step === 1) return <Step1ObjectPartijen formData={koop} onChange={handleChange} />
      if (step === 2) return <Step2Kenmerken formData={koop} onChange={handleChange} />
      if (step === 3) return <Step3Voorwaarden formData={koop} onChange={handleChange} />
    }

    if (documentType === 'samenlevingsovereenkomst') {
      const sam = formData as SamenlevingsovereenkomstFormData
      if (step === 1) return <Step1Partners formData={sam} onChange={handleChange} />
      if (step === 2) return <Step2Vermogen formData={sam} onChange={handleChange} />
      if (step === 3) return <Step3Regelingen formData={sam} onChange={handleChange} />
    }

    if (documentType === 'splitsingsakte') {
      const split = formData as SplitsingsakteFormData
      if (step === 1) return <Step1Gebouw formData={split} onChange={handleChange} />
      if (step === 2) return <Step2SplitsingKenmerken formData={split} onChange={handleChange} />
    }

    return null
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Terug naar home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">NotaFlow</h1>
              <p className="text-xs text-slate-400">{documentTypeLabels[documentType]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saving && <span className="text-xs text-slate-400">Opslaan...</span>}
            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded">Concept</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <ProgressBar currentStep={step} steps={activeStepLabels} />

        <div className="mt-8">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 py-2 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Vorige
          </button>
          {step < maxSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
            >
              Volgende
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-2 text-sm bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {exporting ? 'Exporteren...' : 'Download als Word'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
