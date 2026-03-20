'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentType, documentTypeLabels, documentTypeDescriptions } from '@/lib/types'

const documentTypes: { type: DocumentType; icon: string }[] = [
  { type: 'koopovereenkomst', icon: '🏠' },
  { type: 'samenlevingsovereenkomst', icon: '👥' },
  { type: 'splitsingsakte', icon: '🏢' },
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">NotaFlow</h1>
          <p className="text-gray-500 text-lg">Akte Builder voor Notariskantoren</p>
          <p className="text-gray-400 text-sm mt-1">
            Genereer concept-akten voor woningen en samenwoners in Amsterdam
          </p>
        </div>

        <div className="grid gap-4">
          {documentTypes.map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => handleNieuw(type)}
              disabled={loading !== null}
              className="w-full bg-white border border-gray-200 hover:border-teal-300 hover:shadow-sm rounded-xl p-5 text-left transition-all disabled:opacity-50 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                      {documentTypeLabels[type]}
                    </h3>
                    {loading === type ? (
                      <span className="text-xs text-gray-400">Bezig...</span>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {documentTypeDescriptions[type]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          MVP voor notariskantoren in Amsterdam
        </p>
      </div>
    </div>
  )
}
