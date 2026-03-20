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
  const colors: Record<string, string> = {
    standaard: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    conditioneel: 'bg-amber-50 text-amber-700 border-amber-200',
    handmatig: 'bg-nota-50 text-nota-700 border-nota-200',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${colors[type] || colors.standaard}`}>
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
          <h2 className="text-lg font-semibold text-nota-900 mb-1">Clausule-overzicht</h2>
          <p className="text-sm text-[var(--muted)]">
            {transactieClausules.filter(tc => tc.actief).length} clausules geselecteerd
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowLibrary(!showLibrary)}
          className="text-sm text-nota-700 hover:text-nota-900 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-nota-50 transition-colors duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Clausule toevoegen
        </button>
      </div>

      {/* Library */}
      {showLibrary && availableClausules.length > 0 && (
        <div className="bg-white rounded-xl border border-[var(--border)] shadow-card p-5">
          <h3 className="text-sm font-medium text-nota-800 mb-3">Beschikbare clausules</h3>
          <div className="space-y-1">
            {availableClausules.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-nota-50 transition-colors duration-150">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-nota-900">{c.artikelnummer} — {c.naam}</span>
                  <Badge type={c.type} />
                </div>
                <button
                  type="button"
                  onClick={() => { onAddClausule(c.id); setShowLibrary(false) }}
                  className="text-xs text-nota-700 hover:text-nota-900 font-medium px-2.5 py-1 rounded-md hover:bg-nota-100 transition-colors duration-150"
                >
                  Toevoegen
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active clausules */}
      <div className="space-y-2">
        {transactieClausules.map((tc) => (
          <div
            key={tc.id}
            className={`bg-white rounded-xl border shadow-card transition-all duration-150 ${
              tc.actief ? 'border-[var(--border)]' : 'border-[var(--border-light)] opacity-50'
            }`}
          >
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-nota-900">
                  {tc.clausule.artikelnummer} — {tc.clausule.naam}
                </span>
                <Badge type={tc.aangepaste_tekst ? 'handmatig' : tc.clausule.type} />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(tc)}
                  className="text-xs text-[var(--muted)] hover:text-nota-700 font-medium px-2 py-1 rounded-md hover:bg-nota-50 transition-colors duration-150"
                >
                  Bekijken
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={tc.actief}
                  onClick={() => onToggleClausule(tc.id, !tc.actief)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                    tc.actief ? 'bg-nota-700' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
                      tc.actief ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editingId && (
        <div className="fixed inset-0 bg-nota-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-[var(--border)]">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-semibold text-nota-900">Clausule bewerken</h3>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="text-[var(--muted)] hover:text-nota-700 p-1 rounded-lg hover:bg-nota-50 transition-colors duration-150"
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
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl text-sm font-mono focus:outline-none resize-none bg-nota-50"
              />
            </div>
            <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2 text-sm text-[var(--muted)] hover:text-nota-800 font-medium rounded-lg hover:bg-nota-50 transition-colors duration-150"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="px-5 py-2 text-sm bg-nota-700 text-white rounded-lg hover:bg-nota-800 font-medium transition-colors duration-150 shadow-sm"
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
