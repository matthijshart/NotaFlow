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

export default function Step2Vermogen({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-nota-900 mb-1">Vermogen & woning</h2>
        <p className="text-sm text-[var(--muted)]">
          Kies de vermogensregeling en woningsituatie
        </p>
      </div>

      {/* Vermogensregeling */}
      <div>
        <label className="block text-sm font-medium text-nota-800 mb-3">Vermogensregeling</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([
            { value: 'koude_uitsluiting', label: 'Koude uitsluiting', desc: 'Ieder behoudt eigen vermogen — geen gemeenschap van goederen' },
            { value: 'beperkte_gemeenschap', label: 'Beperkte gemeenschap', desc: 'Inboedel en gezamenlijke aanschaffingen worden gemeenschappelijk' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ vermogensregeling: opt.value })}
              className={`p-5 rounded-xl border text-left transition-all duration-150 ${
                formData.vermogensregeling === opt.value
                  ? 'border-nota-400 bg-nota-50 shadow-sm'
                  : 'border-[var(--border)] bg-white hover:border-nota-300 shadow-card'
              }`}
            >
              <span className={`text-sm font-semibold ${formData.vermogensregeling === opt.value ? 'text-nota-700' : 'text-nota-900'}`}>
                {opt.label}
              </span>
              <p className="text-xs text-[var(--muted)] mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] shadow-card px-6">
        <Toggle
          label="Gemeenschappelijke woning?"
          description="Regeling voor gebruik en eigendom van de gezamenlijke woning"
          checked={formData.gemeenschappelijke_woning}
          onChange={(val) => onChange({ gemeenschappelijke_woning: val })}
        />

        {formData.gemeenschappelijke_woning && (
          <div className="py-3 pl-4 border-b border-[var(--border-light)]">
            <label className="block text-sm font-medium text-nota-700 mb-2">Eigenaar woning</label>
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
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    formData.woning_eigenaar === opt.value
                      ? 'bg-nota-700 text-white shadow-sm'
                      : 'bg-nota-50 text-nota-600 hover:bg-nota-100 border border-nota-200'
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
