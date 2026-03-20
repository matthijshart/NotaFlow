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
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Partners</h2>
        <p className="text-sm text-gray-500">Gegevens van beide partners</p>
      </div>

      {/* Partner 1 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Partner 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
            <input
              type="text"
              value={formData.partner1_naam}
              onChange={(e) => onChange({ partner1_naam: e.target.value })}
              placeholder="Volledige naam"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Geboortedatum</label>
            <input
              type="date"
              value={formData.partner1_geboortedatum}
              onChange={(e) => onChange({ partner1_geboortedatum: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
            <input
              type="text"
              value={formData.partner1_adres}
              onChange={(e) => onChange({ partner1_adres: e.target.value })}
              placeholder="Woonadres partner 1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Partner 2 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Partner 2</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
            <input
              type="text"
              value={formData.partner2_naam}
              onChange={(e) => onChange({ partner2_naam: e.target.value })}
              placeholder="Volledige naam"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Geboortedatum</label>
            <input
              type="date"
              value={formData.partner2_geboortedatum}
              onChange={(e) => onChange({ partner2_geboortedatum: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
            <input
              type="text"
              value={formData.partner2_adres}
              onChange={(e) => onChange({ partner2_adres: e.target.value })}
              placeholder="Woonadres partner 2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Gezamenlijk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datum samenwonen</label>
          <input
            type="date"
            value={formData.datum_samenwonen}
            onChange={(e) => onChange({ datum_samenwonen: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gezamenlijk adres</label>
          <input
            type="text"
            value={formData.adres}
            onChange={(e) => onChange({ adres: e.target.value })}
            placeholder="Adres gezamenlijke woning"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
