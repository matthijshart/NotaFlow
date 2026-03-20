'use client'

import { KoopovereenkomstFormData } from '@/lib/types'

interface Props {
  formData: KoopovereenkomstFormData
  onChange: (data: Partial<KoopovereenkomstFormData>) => void
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-[var(--border-light)] last:border-0">
      <div className="pr-4">
        <span className="text-sm font-medium text-nota-900">{label}</span>
        {description && <p className="text-xs text-[var(--muted)] mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
          checked ? 'bg-nota-700' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
            checked ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function Step3Voorwaarden({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Ontbindende voorwaarden</h2>
        <p className="text-sm text-[var(--muted)]">
          Selecteer de ontbindende voorwaarden die van toepassing zijn
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card px-6">
        <Toggle
          label="Financieringsvoorbehoud"
          description="Koper kan ontbinden bij niet-verkrijgen financiering"
          checked={formData.financieringsvoorbehoud}
          onChange={(val) => onChange({ financieringsvoorbehoud: val })}
        />

        {formData.financieringsvoorbehoud && (
          <div className="py-4 pl-4 border-b border-[var(--border-light)]">
            <label className="block text-sm font-medium text-nota-700 mb-2">
              Financieringstermijn: <span className="text-nota-900 font-semibold">{formData.financieringstermijn_weken} weken</span>
            </label>
            <input
              type="range"
              min={3}
              max={12}
              value={formData.financieringstermijn_weken}
              onChange={(e) => onChange({ financieringstermijn_weken: parseInt(e.target.value) })}
              className="w-full h-2 bg-nota-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
              <span>3 weken</span>
              <span>12 weken</span>
            </div>
          </div>
        )}

        <Toggle
          label="NHG van toepassing"
          description="Nationale Hypotheek Garantie"
          checked={formData.nhg}
          onChange={(val) => onChange({ nhg: val })}
        />

        <Toggle
          label="Bouwkundig voorbehoud"
          description="Ontbinding bij herstelkosten > € 5.000"
          checked={formData.bouwkundig_voorbehoud}
          onChange={(val) => onChange({ bouwkundig_voorbehoud: val })}
        />

        <Toggle
          label="Huisvestingsvergunning"
          description="Vereist in Amsterdam bij woningen < € 512.000 WOZ-waarde"
          checked={formData.huisvestingsvergunning}
          onChange={(val) => onChange({ huisvestingsvergunning: val })}
        />
      </div>
    </div>
  )
}
