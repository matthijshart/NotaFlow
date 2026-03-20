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
  onKadastraalLoading?: (loading: boolean) => void
}

export default function AdresAutocomplete({ value, onSelect, onChange, onKadastraalLoading }: Props) {
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

  // Secondary lookup: search for perceel (cadastral parcel) by address text
  async function fetchPerceelByAddress(adresText: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        q: adresText,
        fq: 'gemeentenaam:amsterdam',
        fl: 'id,weergavenaam,type,kadastrale_aanduiding',
        rows: '1',
      })
      params.append('fq', 'type:perceel')

      const res = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?${params}`
      )
      const data = await res.json()
      const firstDoc = data.response?.docs?.[0]

      if (!firstDoc) return ''

      // If kadastrale_aanduiding is directly available
      if (firstDoc.kadastrale_aanduiding?.[0]) {
        return firstDoc.kadastrale_aanduiding[0]
      }

      // Otherwise lookup the perceel for full details
      const lookupParams = new URLSearchParams({
        id: firstDoc.id,
        fl: 'kadastrale_aanduiding,weergavenaam',
      })
      const lookupRes = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?${lookupParams}`
      )
      const lookupData = await lookupRes.json()
      const doc = lookupData.response?.docs?.[0]
      return doc?.kadastrale_aanduiding?.[0] || doc?.weergavenaam || ''
    } catch {
      return ''
    }
  }

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
    onKadastraalLoading?.(true)

    // Lookup full details to get kadastrale aanduiding
    try {
      const params = new URLSearchParams({
        id: suggestion.id,
        fl: 'straatnaam,huis_nlt,postcode,woonplaatsnaam,kadastrale_aanduiding,centroide_ll',
      })
      const res = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?${params}`
      )
      const data = await res.json()
      const doc: PDOKLookupResult = data.response?.docs?.[0] || {}

      const adres = suggestion.weergavenaam
      let kadastraal = doc.kadastrale_aanduiding?.[0] || ''

      // If no cadastral data from address lookup, try perceel search
      if (!kadastraal) {
        kadastraal = await fetchPerceelByAddress(adres)
      }

      onSelect(adres, kadastraal)
    } catch {
      onSelect(suggestion.weergavenaam, '')
    } finally {
      onKadastraalLoading?.(false)
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
      <label className="block text-sm font-medium text-nota-700 mb-1.5">Adres</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Zoek op straatnaam, postcode of adres..."
          className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-nota-200 border-t-nota-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-[var(--border)] rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-nota-50 border-b border-[var(--border-light)] last:border-0 transition-colors duration-150"
              >
                <span className="text-nota-900">{s.weergavenaam}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
