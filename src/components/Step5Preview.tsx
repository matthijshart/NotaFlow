'use client'

import {
  TransactieFormData,
  TransactieClausuleData,
  KoopovereenkomstFormData,
  SamenlevingsovereenkomstFormData,
  SplitsingsakteFormData,
  documentTypeLabels,
} from '@/lib/types'
import { renderClausuleTekstWithHighlights } from '@/lib/clausule-engine'

interface Props {
  formData: TransactieFormData
  transactieClausules: TransactieClausuleData[]
  onExport: () => void
  exporting: boolean
}

function KoopHeader({ data }: { data: KoopovereenkomstFormData }) {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">KOOPOVEREENKOMST</h1>
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Amsterdams Ring Model</p>
        <p className="text-sm text-gray-600">
          betreffende het registergoed gelegen te{' '}
          <span className="highlight-var">{data.adres || '[adres]'}</span>
        </p>
      </div>
      <div className="mb-8 text-sm">
        <p className="mb-2">De ondergetekenden:</p>
        <p className="mb-1">
          1. <span className="highlight-var">{data.verkoper_naam || '[verkoper]'}</span>, hierna te noemen: &ldquo;verkoper&rdquo;
        </p>
        <p className="mb-4">
          2. <span className="highlight-var">{data.koper_naam || '[koper]'}</span>, hierna te noemen: &ldquo;koper&rdquo;
        </p>
        <p>verklaren het volgende te zijn overeengekomen:</p>
      </div>
    </>
  )
}

function KoopFooter({ data }: { data: KoopovereenkomstFormData }) {
  return (
    <div className="mt-12 text-sm">
      <p className="mb-8">Aldus overeengekomen en in tweevoud opgemaakt te Amsterdam,</p>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="mb-8">Verkoper:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">{data.verkoper_naam || '[naam verkoper]'}</p>
        </div>
        <div>
          <p className="mb-8">Koper:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">{data.koper_naam || '[naam koper]'}</p>
        </div>
      </div>
    </div>
  )
}

function SamenlevingHeader({ data }: { data: SamenlevingsovereenkomstFormData }) {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">SAMENLEVINGSOVEREENKOMST</h1>
      </div>
      <div className="mb-8 text-sm">
        <p className="mb-2">De ondergetekenden:</p>
        <p className="mb-1">
          1. <span className="highlight-var">{data.partner1_naam || '[partner 1]'}</span>,
          geboren op <span className="highlight-var">{data.partner1_geboortedatum || '[geboortedatum]'}</span>,
          hierna te noemen: &ldquo;partner 1&rdquo;
        </p>
        <p className="mb-4">
          2. <span className="highlight-var">{data.partner2_naam || '[partner 2]'}</span>,
          geboren op <span className="highlight-var">{data.partner2_geboortedatum || '[geboortedatum]'}</span>,
          hierna te noemen: &ldquo;partner 2&rdquo;
        </p>
        <p>verklaren de volgende samenlevingsovereenkomst aan te gaan:</p>
      </div>
    </>
  )
}

function SamenlevingFooter({ data }: { data: SamenlevingsovereenkomstFormData }) {
  return (
    <div className="mt-12 text-sm">
      <p className="mb-8">Aldus overeengekomen en in tweevoud opgemaakt en ondertekend te Amsterdam,</p>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="mb-8">Partner 1:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">{data.partner1_naam || '[partner 1]'}</p>
        </div>
        <div>
          <p className="mb-8">Partner 2:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">{data.partner2_naam || '[partner 2]'}</p>
        </div>
      </div>
    </div>
  )
}

function SplitsingHeader({ data }: { data: SplitsingsakteFormData }) {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">AKTE VAN SPLITSING IN APPARTEMENTSRECHTEN</h1>
        <p className="text-sm text-gray-600">
          betreffende het gebouw gelegen te{' '}
          <span className="highlight-var">{data.adres || '[adres]'}</span>
        </p>
      </div>
      <div className="mb-8 text-sm">
        <p className="mb-2">
          Heden verscheen voor mij, notaris te Amsterdam:
        </p>
        <p className="mb-4">
          <span className="highlight-var">{data.eigenaar_naam || '[eigenaar]'}</span>,
          hierna te noemen: &ldquo;de eigenaar&rdquo;
        </p>
        <p>De eigenaar verklaart het hierna te omschrijven gebouw te splitsen in appartementsrechten als volgt:</p>
      </div>
    </>
  )
}

function SplitsingFooter({ data }: { data: SplitsingsakteFormData }) {
  return (
    <div className="mt-12 text-sm">
      <p className="mb-8">
        Waarvan akte, verleden te Amsterdam.
      </p>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="mb-8">De eigenaar:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">{data.eigenaar_naam || '[eigenaar]'}</p>
        </div>
        <div>
          <p className="mb-8">De notaris:</p>
          <div className="border-b border-gray-400 mb-1" />
          <p className="text-xs text-gray-500">[naam notaris]</p>
        </div>
      </div>
    </div>
  )
}

export default function Step5Preview({ formData, transactieClausules, onExport, exporting }: Props) {
  const activeClausules = transactieClausules.filter(tc => tc.actief)
  const docLabel = documentTypeLabels[formData.document_type]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Preview & export</h2>
          <p className="text-sm text-gray-500">
            Controleer de concept-{docLabel.toLowerCase()} en exporteer als Word-document
          </p>
        </div>
        <button
          type="button"
          onClick={onExport}
          disabled={exporting}
          className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-5 rounded-lg transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {exporting ? 'Exporteren...' : 'Download als Word'}
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-8 md:p-12 max-w-3xl mx-auto legal-text">
          {formData.document_type === 'koopovereenkomst' && <KoopHeader data={formData} />}
          {formData.document_type === 'samenlevingsovereenkomst' && <SamenlevingHeader data={formData} />}
          {formData.document_type === 'splitsingsakte' && <SplitsingHeader data={formData} />}

          {activeClausules.map((tc) => {
            const tekst = tc.aangepaste_tekst || tc.clausule.tekst_template
            const rendered = tc.aangepaste_tekst
              ? tc.aangepaste_tekst
              : renderClausuleTekstWithHighlights(tekst, formData)

            return (
              <div key={tc.id} className="artikel mb-6">
                <div className="artikel-header text-sm">
                  {tc.clausule.artikelnummer} — {tc.clausule.naam}
                </div>
                <div
                  className="text-sm whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: rendered }}
                />
              </div>
            )
          })}

          {formData.document_type === 'koopovereenkomst' && <KoopFooter data={formData} />}
          {formData.document_type === 'samenlevingsovereenkomst' && <SamenlevingFooter data={formData} />}
          {formData.document_type === 'splitsingsakte' && <SplitsingFooter data={formData} />}
        </div>
      </div>
    </div>
  )
}
