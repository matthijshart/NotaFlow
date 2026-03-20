'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleNieuw() {
    setLoading(true)
    const res = await fetch('/api/transacties', { method: 'POST' })
    const data = await res.json()
    router.push(`/transactie/${data.id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">NotaFlow</h1>
          <p className="text-gray-500 text-lg">Koopovereenkomst Builder</p>
          <p className="text-gray-400 text-sm mt-1">
            Genereer concept-koopovereenkomsten voor woningen in Amsterdam
          </p>
        </div>

        <button
          onClick={handleNieuw}
          disabled={loading}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Bezig...' : 'Nieuwe koopovereenkomst'}
        </button>

        <p className="text-center text-gray-400 text-xs mt-8">
          MVP voor notariskantoren in Amsterdam
        </p>
      </div>
    </div>
  )
}
