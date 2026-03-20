'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentType, documentTypeLabels, documentTypeDescriptions } from '@/lib/types'

const documentTypes: { type: DocumentType; icon: React.ReactNode }[] = [
  {
    type: 'koopovereenkomst',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    type: 'samenlevingsovereenkomst',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    type: 'splitsingsakte',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">NotaFlow</h1>
          <p className="text-slate-500 text-lg">Akte Builder voor Notariskantoren</p>
          <p className="text-slate-400 text-sm mt-1">
            Genereer concept-akten voor woningen en samenwoners in Amsterdam
          </p>
        </div>

        <div className="grid gap-4">
          {documentTypes.map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => handleNieuw(type)}
              disabled={loading !== null}
              className="w-full bg-white border border-slate-200 hover:border-slate-400 hover:shadow-sm rounded-xl p-5 text-left transition-all disabled:opacity-50 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-slate-800 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">
                      {documentTypeLabels[type]}
                    </h3>
                    {loading === type ? (
                      <span className="text-xs text-slate-400">Bezig...</span>
                    ) : (
                      <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    {documentTypeDescriptions[type]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          MVP voor notariskantoren in Amsterdam
        </p>
      </div>
    </div>
  )
}
