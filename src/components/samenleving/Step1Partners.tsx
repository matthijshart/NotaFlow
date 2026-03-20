'use client'

import { SamenlevingsovereenkomstFormData } from '@/lib/types'

interface Props {
  formData: SamenlevingsovereenkomstFormData
  onChange: (data: Partial<SamenlevingsovereenkomstFormData>) => void
}

export default function Step1Partners({ formData, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Partners</h2>
        <p className="text-sm text-[var(--muted)]">Gegevens van beide partners</p>
      </div>

      {/* Partner 1 */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-xs font-semibold text-nota-500 mb-4 uppercase tracking-wider">Partner 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Naam</label>
            <input
              type="text"
              value={formData.partner1_naam}
              onChange={(e) => onChange({ partner1_naam: e.target.value })}
              placeholder="Volledige naam"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Geboortedatum</label>
            <input
              type="date"
              value={formData.partner1_geboortedatum}
              onChange={(e) => onChange({ partner1_geboortedatum: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Adres</label>
            <input
              type="text"
              value={formData.partner1_adres}
              onChange={(e) => onChange({ partner1_adres: e.target.value })}
              placeholder="Woonadres partner 1"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Partner 2 */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-xs font-semibold text-nota-500 mb-4 uppercase tracking-wider">Partner 2</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Naam</label>
            <input
              type="text"
              value={formData.partner2_naam}
              onChange={(e) => onChange({ partner2_naam: e.target.value })}
              placeholder="Volledige naam"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Geboortedatum</label>
            <input
              type="date"
              value={formData.partner2_geboortedatum}
              onChange={(e) => onChange({ partner2_geboortedatum: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Adres</label>
            <input
              type="text"
              value={formData.partner2_adres}
              onChange={(e) => onChange({ partner2_adres: e.target.value })}
              placeholder="Woonadres partner 2"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Gezamenlijk */}
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-6">
        <h3 className="text-xs font-semibold text-nota-500 mb-4 uppercase tracking-wider">Gezamenlijk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Datum samenwonen</label>
            <input
              type="date"
              value={formData.datum_samenwonen}
              onChange={(e) => onChange({ datum_samenwonen: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nota-700 mb-1.5">Gezamenlijk adres</label>
            <input
              type="text"
              value={formData.adres}
              onChange={(e) => onChange({ adres: e.target.value })}
              placeholder="Adres gezamenlijke woning"
              className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
