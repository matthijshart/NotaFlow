'use client'

import { SplitsingsakteFormData } from '@/lib/types'
import AdresAutocomplete from '../AdresAutocomplete'

interface Props {
  formData: SplitsingsakteFormData
  onChange: (data: Partial<SplitsingsakteFormData>) => void
}

export default function Step1Gebouw({ formData, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Gebouw & eigenaar</h2>
        <p className="text-sm text-gray-500">Gegevens van het te splitsen gebouw</p>
      </div>

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
            placeholder="ASD04 K 1234"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aantal appartementen</label>
          <input
            type="number"
            min={2}
            value={formData.aantal_appartementen}
            onChange={(e) => onChange({ aantal_appartementen: parseInt(e.target.value) || 2 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bouwjaar</label>
          <input
            type="text"
            value={formData.bouwjaar}
            onChange={(e) => onChange({ bouwjaar: e.target.value })}
            placeholder="bijv. 1920"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Naam VvE</label>
          <input
            type="text"
            value={formData.vve_naam}
            onChange={(e) => onChange({ vve_naam: e.target.value })}
            placeholder="VvE Keizersgracht 100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Eigenaar / splitsende partij</label>
        <input
          type="text"
          value={formData.eigenaar_naam}
          onChange={(e) => onChange({ eigenaar_naam: e.target.value })}
          placeholder="Naam eigenaar van het gebouw"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
