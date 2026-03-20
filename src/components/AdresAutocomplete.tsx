'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface PDOKSuggestion {
  id: string
  weergavenaam: string
  type: string
}

interface PDOKLookupResult {
  straatnaam?: string
  huis_nlt?: string
  postcode?: string
  woonplaatsnaam?: string
  gemeentenaam?: string
  kadastrale_aanduiding?: string[]
  centroide_ll?: string
}

interface Props {
  value: string
  onSelect: (adres: string, kadastraal: string) => void
  onChange: (value: string) => void
}

export default function AdresAutocomplete({ value, onSelect, onChange }: Props) {
  const [suggestions, setSuggestions] = useState<PDOKSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        fq: 'gemeentenaam:amsterdam',
        fl: 'id,weergavenaam,type',
        rows: '8',
      })
      // Filter on address type
      params.append('fq', 'type:adres')

      const res = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?${params}`
      )
      const data = await res.json()

      const items: PDOKSuggestion[] = (data.response?.docs || []).map(
        (doc: { id: string; weergavenaam: string; type: string }) => ({
          id: doc.id,
          weergavenaam: doc.weergavenaam,
          type: doc.type,
        })
      )
      setSuggestions(items)
      setOpen(items.length > 0)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  function handleInputChange(val: string) {
    onChange(val)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val)
    }, 250)
  }

  async function handleSelect(suggestion: PDOKSuggestion) {
    setOpen(false)
    onChange(suggestion.weergavenaam)

    // Lookup full details to get kadastrale aanduiding
    try {
      const params = new URLSearchParams({
        id: suggestion.id,
        fl: 'straatnaam,huis_nlt,postcode,woonplaatsnaam,kadastrale_aanduiding',
      })
      const res = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?${params}`
      )
      const data = await res.json()
      const doc: PDOKLookupResult = data.response?.docs?.[0] || {}

      const adres = suggestion.weergavenaam
      const kadastraal = doc.kadastrale_aanduiding?.[0] || ''

      onSelect(adres, kadastraal)
    } catch {
      onSelect(suggestion.weergavenaam, '')
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Zoek op straatnaam, postcode of adres..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
              >
                <span className="text-gray-900">{s.weergavenaam}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
