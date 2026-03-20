'use client'

import { SamenlevingsovereenkomstFormData } from '@/lib/types'

interface Props {
  formData: SamenlevingsovereenkomstFormData
  onChange: (data: Partial<SamenlevingsovereenkomstFormData>) => void
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
          checked ? 'bg-slate-700' : 'bg-gray-200'
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

export default function Step3Regelingen({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Pensioen, alimentatie & overlijden</h2>
        <p className="text-sm text-gray-500">
          Selecteer welke regelingen van toepassing zijn
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 px-5">
        <Toggle
          label="Pensioenverevening?"
          description="Verevening ouderdomspensioen bij beëindiging samenleving"
          checked={formData.pensioenregeling}
          onChange={(val) => onChange({ pensioenregeling: val })}
        />

        <Toggle
          label="Partnerpensioen?"
          description="Partners wijzen elkaar aan als begunstigde voor partnerpensioen"
          checked={formData.partnerpensioen}
          onChange={(val) => onChange({ partnerpensioen: val })}
        />

        <Toggle
          label="Alimentatieregeling?"
          description="Onderhoudsverplichting bij beëindiging van de samenleving"
          checked={formData.alimentatie}
          onChange={(val) => onChange({ alimentatie: val })}
        />

        <Toggle
          label="Verblijvingsbeding?"
          description="Gemeenschappelijke goederen verblijven aan langstlevende partner bij overlijden"
          checked={formData.verblijvingsbeding}
          onChange={(val) => onChange({ verblijvingsbeding: val })}
        />
      </div>
    </div>
  )
}
