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

export default function Step2Vermogen({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Vermogen & woning</h2>
        <p className="text-sm text-gray-500">
          Kies de vermogensregeling en woningsituatie
        </p>
      </div>

      {/* Vermogensregeling */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Vermogensregeling</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([
            { value: 'koude_uitsluiting', label: 'Koude uitsluiting', desc: 'Ieder behoudt eigen vermogen — geen gemeenschap van goederen' },
            { value: 'beperkte_gemeenschap', label: 'Beperkte gemeenschap', desc: 'Inboedel en gezamenlijke aanschaffingen worden gemeenschappelijk' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ vermogensregeling: opt.value })}
              className={`p-4 rounded-lg border text-left transition-all ${
                formData.vermogensregeling === opt.value
                  ? 'border-slate-500 bg-slate-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-sm font-medium ${formData.vermogensregeling === opt.value ? 'text-slate-700' : 'text-gray-900'}`}>
                {opt.label}
              </span>
              <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 px-5">
        <Toggle
          label="Gemeenschappelijke woning?"
          description="Regeling voor gebruik en eigendom van de gezamenlijke woning"
          checked={formData.gemeenschappelijke_woning}
          onChange={(val) => onChange({ gemeenschappelijke_woning: val })}
        />

        {formData.gemeenschappelijke_woning && (
          <div className="py-3 pl-4 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Eigenaar woning</label>
            <div className="flex gap-2">
              {([
                { value: 'partner1', label: 'Partner 1' },
                { value: 'partner2', label: 'Partner 2' },
                { value: 'gezamenlijk', label: 'Gezamenlijk' },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ woning_eigenaar: opt.value })}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    formData.woning_eigenaar === opt.value
                      ? 'bg-slate-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <Toggle
          label="Inboedelverdeling opnemen?"
          description="Regeling voor verdeling inboedel bij einde samenleving"
          checked={formData.inboedelverdeling}
          onChange={(val) => onChange({ inboedelverdeling: val })}
        />
      </div>
    </div>
  )
}
