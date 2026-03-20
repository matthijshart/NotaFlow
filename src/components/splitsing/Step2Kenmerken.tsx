'use client'

import { SplitsingsakteFormData } from '@/lib/types'

interface Props {
  formData: SplitsingsakteFormData
  onChange: (data: Partial<SplitsingsakteFormData>) => void
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

export default function Step2Kenmerken({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Kenmerken gebouw</h2>
        <p className="text-sm text-[var(--muted)]">
          Eigenschappen die de inhoud van de splitsingsakte bepalen
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card px-6">
        <Toggle
          label="Erfpacht?"
          description="Het gebouw staat op erfpachtgrond van de gemeente Amsterdam"
          checked={formData.erfpacht}
          onChange={(val) => onChange({ erfpacht: val })}
        />

        {formData.erfpacht && (
          <div className="py-3 pl-4 border-b border-[var(--border-light)]">
            <label className="block text-sm font-medium text-nota-700 mb-2">Type erfpacht</label>
            <div className="flex gap-2">
              {(['eeuwigdurend', 'tijdelijk'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange({ erfpacht_type: type })}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    formData.erfpacht_type === type
                      ? 'bg-nota-700 text-white shadow-sm'
                      : 'bg-nota-50 text-nota-600 hover:bg-nota-100 border border-nota-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-nota-50 rounded-xl border border-nota-200 p-5">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-nota-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-nota-700">
            De splitsingsakte bevat standaard alle benodigde artikelen voor de VvE-oprichting,
            breukdelen, gemeenschappelijke en priv&eacute;-gedeelten, en het huishoudelijk reglement.
            In de volgende stap kunt u clausules bekijken en aanpassen.
          </p>
        </div>
      </div>
    </div>
  )
}
