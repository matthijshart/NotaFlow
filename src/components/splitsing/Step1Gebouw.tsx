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
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Gebouw & eigenaar</h2>
        <p className="text-sm text-[var(--muted)]">Gegevens van het te splitsen gebouw</p>
      </div>

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
              placeholder="ASD04 K 1234"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-sm font-medium text-nota-800 mb-4">Gebouwinformatie</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Aantal appartementen</label>
            <input
              type="number"
              min={2}
              value={formData.aantal_appartementen}
              onChange={(e) => onChange({ aantal_appartementen: parseInt(e.target.value) || 2 })}
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Bouwjaar</label>
            <input
              type="text"
              value={formData.bouwjaar}
              onChange={(e) => onChange({ bouwjaar: e.target.value })}
              placeholder="bijv. 1920"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Naam VvE</label>
            <input
              type="text"
              value={formData.vve_naam}
              onChange={(e) => onChange({ vve_naam: e.target.value })}
              placeholder="VvE Keizersgracht 100"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-sm font-medium text-nota-800 mb-4">Eigenaar</h3>
        <div>
          <label className="block text-sm font-medium text-nota-700 mb-1.5">Eigenaar / splitsende partij</label>
          <input
            type="text"
            value={formData.eigenaar_naam}
            onChange={(e) => onChange({ eigenaar_naam: e.target.value })}
            placeholder="Naam eigenaar van het gebouw"
            className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
