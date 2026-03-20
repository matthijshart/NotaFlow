'use client'

import { useState } from 'react'
import { KoopovereenkomstFormData } from '@/lib/types'
import AdresAutocomplete from './AdresAutocomplete'

const objectTypes = [
  { value: 'eengezinswoning', label: 'Eengezinswoning' },
  { value: 'appartement', label: 'Appartement' },
  { value: 'grachtenpand', label: 'Grachtenpand' },
  { value: 'nieuwbouw', label: 'Nieuwbouw' },
] as const

interface Props {
  formData: KoopovereenkomstFormData
  onChange: (data: Partial<KoopovereenkomstFormData>) => void
}

export default function Step1ObjectPartijen({ formData, onChange }: Props) {
  const [kadastraalLoading, setKadastraalLoading] = useState(false)
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Object & partijen</h2>
        <p className="text-sm text-[var(--muted)]">Basisgegevens van de transactie</p>
      </div>

      {/* Type object */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <label className="block text-sm font-medium text-nota-800 mb-3">Type object</label>
        <div className="flex flex-wrap gap-2">
          {objectTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange({ type_object: type.value })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                formData.type_object === type.value
                  ? 'bg-nota-700 text-white shadow-sm'
                  : 'bg-nota-50 text-nota-600 hover:bg-nota-100 border border-nota-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Adres & Kadastraal */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-sm font-medium text-nota-800 mb-4">Locatie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdresAutocomplete
            value={formData.adres}
            onChange={(val) => onChange({ adres: val })}
            onSelect={(adres, kadastraal) =>
              onChange({ adres, kadastrale_aanduiding: kadastraal || formData.kadastrale_aanduiding })
            }
            onKadastraalLoading={setKadastraalLoading}
          />
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Kadastrale aanduiding</label>
            <div className="relative">
              <input
                type="text"
                value={formData.kadastrale_aanduiding}
                onChange={(e) => onChange({ kadastrale_aanduiding: e.target.value })}
                placeholder={kadastraalLoading ? 'Opzoeken bij Kadaster...' : 'ASD04 K 1234 A-1'}
                className={`w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white focus:outline-none transition-colors duration-200 ${
                  kadastraalLoading
                    ? 'border-nota-300 bg-nota-50 text-nota-400'
                    : formData.kadastrale_aanduiding
                    ? 'border-green-300 bg-green-50'
                    : 'border-[var(--border)]'
                }`}
                readOnly={kadastraalLoading}
              />
              {kadastraalLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-nota-200 border-t-nota-600 rounded-full animate-spin" />
                </div>
              )}
              {!kadastraalLoading && formData.kadastrale_aanduiding && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {kadastraalLoading && (
              <p className="text-xs text-nota-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Kadastrale gegevens worden opgezocht...
              </p>
            )}
            {!kadastraalLoading && formData.kadastrale_aanduiding && (
              <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Automatisch ingevuld vanuit PDOK Kadaster
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Partijen */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-sm font-medium text-nota-800 mb-4">Partijen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Verkoper</label>
            <input
              type="text"
              value={formData.verkoper_naam}
              onChange={(e) => onChange({ verkoper_naam: e.target.value })}
              placeholder="Naam verkoper"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Koper</label>
            <input
              type="text"
              value={formData.koper_naam}
              onChange={(e) => onChange({ koper_naam: e.target.value })}
              placeholder="Naam koper"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Koopprijs & leveringsdatum */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-sm font-medium text-nota-800 mb-4">Financieel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Koopprijs</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm font-medium">€</span>
              <input
                type="number"
                value={formData.koopprijs ? formData.koopprijs / 100 : ''}
                onChange={(e) => onChange({ koopprijs: Math.round(parseFloat(e.target.value || '0') * 100) })}
                placeholder="450.000"
                className="w-full pl-8 pr-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Leveringsdatum</label>
            <input
              type="date"
              value={formData.leveringsdatum}
              onChange={(e) => onChange({ leveringsdatum: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
