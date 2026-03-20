'use client'

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
          />
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Kadastrale aanduiding</label>
            <input
              type="text"
              value={formData.kadastrale_aanduiding}
              onChange={(e) => onChange({ kadastrale_aanduiding: e.target.value })}
              placeholder="ASD04 K 1234 A-1"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
            {formData.kadastrale_aanduiding && (
              <p className="text-xs text-[var(--muted)] mt-1.5">Automatisch ingevuld vanuit PDOK</p>
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
