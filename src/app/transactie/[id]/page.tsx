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
import { TransactieFormData, TransactieClausuleData, ClausuleData, defaultFormData } from '@/lib/types'
import { shouldClausuleBeActive } from '@/lib/clausule-engine'
import { generateDocx } from '@/lib/docx-export'

export default function TransactiePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<TransactieFormData>(defaultFormData)
  const [transactieClausules, setTransactieClausules] = useState<TransactieClausuleData[]>([])
  const [alleClausules, setAlleClausules] = useState<ClausuleData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)

  // Load transaction and all clausules
  useEffect(() => {
    Promise.all([
      fetch(`/api/transacties/${id}`).then(r => r.json()),
      fetch('/api/clausules').then(r => r.json()),
    ]).then(([transactie, clausules]) => {
      setFormData({
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
      setTransactieClausules(transactie.clausules || [])
      setAlleClausules(clausules)
      setLoading(false)
    })
  }, [id])

  function handleChange(partial: Partial<TransactieFormData>) {
    setFormData(prev => ({ ...prev, ...partial }))
  }

  // Save transaction data to server
  const saveTransaction = useCallback(async (data: TransactieFormData) => {
    setSaving(true)
    await fetch(`/api/transacties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }, [id])

  // Sync clausules based on form data
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

  async function handleNext() {
    await saveTransaction(formData)

    if (step === 3) {
      // When moving to step 4, sync clausules based on form data
      await syncClausules(formData)
    }

    setStep(prev => Math.min(prev + 1, 5))
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
      const fileName = `koopovereenkomst-${formData.adres || 'concept'}.docx`
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
        <p className="text-gray-400">Laden...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Terug naar home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">NotaFlow</h1>
              <p className="text-xs text-gray-400">Koopovereenkomst Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saving && <span className="text-xs text-gray-400">Opslaan...</span>}
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">Concept</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <ProgressBar currentStep={step} />

        <div className="mt-8">
          {step === 1 && <Step1ObjectPartijen formData={formData} onChange={handleChange} />}
          {step === 2 && <Step2Kenmerken formData={formData} onChange={handleChange} />}
          {step === 3 && <Step3Voorwaarden formData={formData} onChange={handleChange} />}
          {step === 4 && (
            <Step4Clausules
              formData={formData}
              transactieClausules={transactieClausules}
              alleClausules={alleClausules}
              onToggleClausule={handleToggleClausule}
              onEditClausule={handleEditClausule}
              onAddClausule={handleAddClausule}
            />
          )}
          {step === 5 && (
            <Step5Preview
              formData={formData}
              transactieClausules={transactieClausules}
              onExport={handleExport}
              exporting={exporting}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Vorige
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors"
            >
              Volgende
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-2 text-sm bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {exporting ? 'Exporteren...' : 'Download als Word'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
