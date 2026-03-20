export interface TransactieFormData {
  // Step 1
  type_object: 'appartement' | 'eengezinswoning' | 'grachtenpand' | 'nieuwbouw'
  adres: string
  kadastrale_aanduiding: string
  verkoper_naam: string
  koper_naam: string
  koopprijs: number // in centen
  leveringsdatum: string

  // Step 2
  vve: boolean
  erfpacht: boolean
  erfpacht_type: 'eeuwigdurend' | 'tijdelijk'
  bouwjaar_voor_1992: boolean
  bouwtechnische_keuring: boolean
  energielabel: boolean

  // Step 3
  financieringsvoorbehoud: boolean
  financieringstermijn_weken: number
  nhg: boolean
  bouwkundig_voorbehoud: boolean
  huisvestingsvergunning: boolean
}

export interface ClausuleData {
  id: string
  artikelnummer: string
  naam: string
  categorie: string
  tekst_template: string
  trigger_conditie: string
  type: string
  volgorde: number
}

export interface TransactieClausuleData {
  id: string
  transactie_id: string
  clausule_id: string
  aangepaste_tekst: string | null
  actief: boolean
  clausule: ClausuleData
}

export interface TransactieData {
  id: string
  aangemaakt_op: string
  status: string
  adres: string
  kadastrale_aanduiding: string
  type_object: string
  verkoper_naam: string
  koper_naam: string
  koopprijs: number
  leveringsdatum: string
  vve: boolean
  erfpacht: boolean
  erfpacht_type: string
  bouwjaar_voor_1992: boolean
  bouwtechnische_keuring: boolean
  energielabel: boolean
  financieringsvoorbehoud: boolean
  financieringstermijn_weken: number
  nhg: boolean
  bouwkundig_voorbehoud: boolean
  huisvestingsvergunning: boolean
  clausules: TransactieClausuleData[]
}

export const defaultFormData: TransactieFormData = {
  type_object: 'eengezinswoning',
  adres: '',
  kadastrale_aanduiding: '',
  verkoper_naam: '',
  koper_naam: '',
  koopprijs: 0,
  leveringsdatum: '',
  vve: false,
  erfpacht: false,
  erfpacht_type: 'eeuwigdurend',
  bouwjaar_voor_1992: false,
  bouwtechnische_keuring: false,
  energielabel: false,
  financieringsvoorbehoud: false,
  financieringstermijn_weken: 6,
  nhg: false,
  bouwkundig_voorbehoud: false,
  huisvestingsvergunning: false,
}
