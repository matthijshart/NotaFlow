'use client'

import { TransactieFormData } from '@/lib/types'

interface Props {
  formData: TransactieFormData
  onChange: (data: Partial<TransactieFormData>) => void
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
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
          checked ? 'bg-teal-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${
            checked ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function Step2Kenmerken({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Kenmerken object</h2>
        <p className="text-sm text-gray-500">
          Deze kenmerken bepalen welke clausules worden geactiveerd
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 px-5">
        <Toggle
          label="VvE van toepassing?"
          description="Activeert clausules over Vereniging van Eigenaars"
          checked={formData.vve}
          onChange={(val) => onChange({ vve: val })}
        />

        <Toggle
          label="Erfpacht?"
          description="Activeert erfpachtclausules"
          checked={formData.erfpacht}
          onChange={(val) => onChange({ erfpacht: val })}
        />

        {formData.erfpacht && (
          <div className="py-3 pl-4 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type erfpacht</label>
            <div className="flex gap-2">
              {(['eeuwigdurend', 'tijdelijk'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange({ erfpacht_type: type })}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    formData.erfpacht_type === type
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <Toggle
          label="Bouwjaar vóór 1992?"
          description="Activeert ouderdomsclausule en asbestbepaling"
          checked={formData.bouwjaar_voor_1992}
          onChange={(val) => onChange({ bouwjaar_voor_1992: val })}
        />

        <Toggle
          label="Bouwtechnische keuring uitgevoerd?"
          description="Voegt keuringsrapport-clausule toe"
          checked={formData.bouwtechnische_keuring}
          onChange={(val) => onChange({ bouwtechnische_keuring: val })}
        />

        <Toggle
          label="Energielabel beschikbaar?"
          description="Energielabel-clausule"
          checked={formData.energielabel}
          onChange={(val) => onChange({ energielabel: val })}
        />
      </div>
    </div>
  )
}
