'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentType, documentTypeLabels, documentTypeDescriptions } from '@/lib/types'

const documentTypes: { type: DocumentType; icon: React.ReactNode; color: string }[] = [
  {
    type: 'koopovereenkomst',
    color: 'bg-nota-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    type: 'samenlevingsovereenkomst',
    color: 'bg-nota-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    type: 'splitsingsakte',
    color: 'bg-nota-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
]

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<DocumentType | null>(null)

  async function handleNieuw(type: DocumentType) {
    setLoading(type)
    const res = await fetch('/api/transacties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_type: type }),
    })
    const data = await res.json()
    router.push(`/transactie/${data.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border)] shadow-header">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-nota-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-nota-900 tracking-tight">NotaFlow</h1>
              <p className="text-xs text-[var(--muted)]">Notarieel documentplatform</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 bg-nota-50 text-nota-600 rounded-md font-medium border border-nota-100">
            Amsterdam
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-nota-900 tracking-tight mb-2">
              Nieuwe akte opstellen
            </h2>
            <p className="text-[var(--muted)] text-sm">
              Kies het type document om te beginnen
            </p>
          </div>

          <div className="grid gap-3">
            {documentTypes.map(({ type, icon, color }) => (
              <button
                key={type}
                onClick={() => handleNieuw(type)}
                disabled={loading !== null}
                className="w-full bg-white border border-[var(--border)] hover:border-nota-300 rounded-xl p-5 text-left transition-all duration-150 disabled:opacity-50 group shadow-card hover:shadow-card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${color} text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-150`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-nota-900 text-[15px]">
                      {documentTypeLabels[type]}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-0.5">
                      {documentTypeDescriptions[type]}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {loading === type ? (
                      <svg className="w-5 h-5 text-nota-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-nota-200 group-hover:text-nota-400 transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-[var(--muted)] text-xs mt-10 opacity-60">
            NotaFlow — Concept-aktes voor notariskantoren in Amsterdam
          </p>
        </div>
      </main>
    </div>
  )
}
