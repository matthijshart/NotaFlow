'use client'

import { useState } from 'react'
import { TransactieFormData, TransactieClausuleData, ClausuleData } from '@/lib/types'
import { renderClausuleTekst } from '@/lib/clausule-engine'

interface Props {
  formData: TransactieFormData
  transactieClausules: TransactieClausuleData[]
  alleClausules: ClausuleData[]
  onToggleClausule: (tcId: string, actief: boolean) => void
  onEditClausule: (tcId: string, tekst: string) => void
  onAddClausule: (clausuleId: string) => void
}

function Badge({ type }: { type: string }) {
  const colors = {
    standaard: 'bg-green-100 text-green-700',
    conditioneel: 'bg-amber-100 text-amber-700',
    handmatig: 'bg-blue-100 text-blue-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[type as keyof typeof colors] || colors.standaard}`}>
      {type}
    </span>
  )
}

export default function Step4Clausules({
  formData,
  transactieClausules,
  alleClausules,
  onToggleClausule,
  onEditClausule,
  onAddClausule,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [showLibrary, setShowLibrary] = useState(false)

  const activeClausuleIds = new Set(transactieClausules.map(tc => tc.clausule_id))
  const availableClausules = alleClausules.filter(c => !activeClausuleIds.has(c.id))

  function startEdit(tc: TransactieClausuleData) {
    setEditingId(tc.id)
    setEditText(tc.aangepaste_tekst || renderClausuleTekst(tc.clausule.tekst_template, formData))
  }

  function saveEdit() {
    if (editingId) {
      onEditClausule(editingId, editText)
      setEditingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Clausule-overzicht</h2>
          <p className="text-sm text-gray-500">
            {transactieClausules.filter(tc => tc.actief).length} clausules geselecteerd
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowLibrary(!showLibrary)}
          className="text-sm text-slate-700 hover:text-slate-900 font-medium"
        >
          + Clausule toevoegen
        </button>
      </div>

      {/* Library modal */}
      {showLibrary && availableClausules.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Beschikbare clausules</h3>
          <div className="space-y-2">
            {availableClausules.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <span className="text-sm text-gray-900">{c.artikelnummer} — {c.naam}</span>
                  <Badge type={c.type} />
                </div>
                <button
                  type="button"
                  onClick={() => { onAddClausule(c.id); setShowLibrary(false) }}
                  className="text-xs text-slate-700 hover:text-slate-900 font-medium"
                >
                  Toevoegen
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active clausules */}
      <div className="space-y-3">
        {transactieClausules.map((tc) => (
          <div
            key={tc.id}
            className={`bg-white rounded-lg border transition-colors ${
              tc.actief ? 'border-gray-200' : 'border-gray-100 opacity-50'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {tc.clausule.artikelnummer} — {tc.clausule.naam}
                </span>
                <Badge type={tc.aangepaste_tekst ? 'handmatig' : tc.clausule.type} />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(tc)}
                  className="text-xs text-gray-500 hover:text-slate-700"
                >
                  Bekijken
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={tc.actief}
                  onClick={() => onToggleClausule(tc.id, !tc.actief)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
                    tc.actief ? 'bg-slate-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5 ${
                      tc.actief ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit drawer/modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Clausule bewerken</h3>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-900"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
