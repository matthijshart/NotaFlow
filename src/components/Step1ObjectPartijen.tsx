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
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Object & partijen</h2>
        <p className="text-sm text-gray-500">Basisgegevens van de transactie</p>
      </div>

      {/* Type object */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Type object</label>
        <div className="flex flex-wrap gap-2">
          {objectTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange({ type_object: type.value })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.type_object === type.value
                  ? 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Adres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdresAutocomplete
          value={formData.adres}
          onChange={(val) => onChange({ adres: val })}
          onSelect={(adres, kadastraal) =>
            onChange({ adres, kadastrale_aanduiding: kadastraal || formData.kadastrale_aanduiding })
          }
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kadastrale aanduiding</label>
          <input
            type="text"
            value={formData.kadastrale_aanduiding}
            onChange={(e) => onChange({ kadastrale_aanduiding: e.target.value })}
            placeholder="ASD04 K 1234 A-1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {formData.kadastrale_aanduiding && (
            <p className="text-xs text-teal-600 mt-1">Automatisch ingevuld vanuit PDOK</p>
          )}
        </div>
      </div>

      {/* Partijen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Verkoper</label>
          <input
            type="text"
            value={formData.verkoper_naam}
            onChange={(e) => onChange({ verkoper_naam: e.target.value })}
            placeholder="Naam verkoper"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Koper</label>
          <input
            type="text"
            value={formData.koper_naam}
            onChange={(e) => onChange({ koper_naam: e.target.value })}
            placeholder="Naam koper"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Koopprijs & leveringsdatum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Koopprijs</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
            <input
              type="number"
              value={formData.koopprijs ? formData.koopprijs / 100 : ''}
              onChange={(e) => onChange({ koopprijs: Math.round(parseFloat(e.target.value || '0') * 100) })}
              placeholder="450.000"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leveringsdatum</label>
          <input
            type="date"
            value={formData.leveringsdatum}
            onChange={(e) => onChange({ leveringsdatum: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
