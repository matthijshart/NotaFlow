'use client'

import { TransactieFormData, TransactieClausuleData } from '@/lib/types'
import { renderClausuleTekstWithHighlights } from '@/lib/clausule-engine'

interface Props {
  formData: TransactieFormData
  transactieClausules: TransactieClausuleData[]
  onExport: () => void
  exporting: boolean
}

export default function Step5Preview({ formData, transactieClausules, onExport, exporting }: Props) {
  const activeClausules = transactieClausules.filter(tc => tc.actief)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Preview & export</h2>
          <p className="text-sm text-gray-500">
            Controleer de concept-koopovereenkomst en exporteer als Word-document
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

      {/* Document preview */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-8 md:p-12 max-w-3xl mx-auto legal-text">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-2">KOOPOVEREENKOMST</h1>
            <p className="text-sm text-gray-600">
              betreffende het registergoed gelegen te{' '}
              <span className="highlight-var">{formData.adres || '[adres]'}</span>
            </p>
          </div>

          <div className="mb-8 text-sm">
            <p className="mb-2">
              De ondergetekenden:
            </p>
            <p className="mb-1">
              1. <span className="highlight-var">{formData.verkoper_naam || '[verkoper]'}</span>, hierna te noemen: &ldquo;verkoper&rdquo;
            </p>
            <p className="mb-4">
              2. <span className="highlight-var">{formData.koper_naam || '[koper]'}</span>, hierna te noemen: &ldquo;koper&rdquo;
            </p>
            <p>verklaren het volgende te zijn overeengekomen:</p>
          </div>

          {/* Clausules */}
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

          {/* Signature block */}
          <div className="mt-12 text-sm">
            <p className="mb-8">
              Aldus overeengekomen en in tweevoud opgemaakt te Amsterdam,
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="mb-8">Verkoper:</p>
                <div className="border-b border-gray-400 mb-1" />
                <p className="text-xs text-gray-500">
                  {formData.verkoper_naam || '[naam verkoper]'}
                </p>
              </div>
              <div>
                <p className="mb-8">Koper:</p>
                <div className="border-b border-gray-400 mb-1" />
                <p className="text-xs text-gray-500">
                  {formData.koper_naam || '[naam koper]'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
