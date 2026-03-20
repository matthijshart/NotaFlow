export type DocumentType = 'koopovereenkomst' | 'samenlevingsovereenkomst' | 'splitsingsakte'

// Shared form data across all document types
export interface BaseFormData {
  document_type: DocumentType
}

// Koopovereenkomst
export interface KoopovereenkomstFormData extends BaseFormData {
  document_type: 'koopovereenkomst'
  type_object: 'appartement' | 'eengezinswoning' | 'grachtenpand' | 'nieuwbouw'
  adres: string
  kadastrale_aanduiding: string
  verkoper_naam: string
  koper_naam: string
  koopprijs: number
  leveringsdatum: string
  vve: boolean
  erfpacht: boolean
  erfpacht_type: 'eeuwigdurend' | 'tijdelijk'
  bouwjaar_voor_1992: boolean
  bouwtechnische_keuring: boolean
  energielabel: boolean
  financieringsvoorbehoud: boolean
  financieringstermijn_weken: number
  nhg: boolean
  bouwkundig_voorbehoud: boolean
  huisvestingsvergunning: boolean
}

// Samenlevingsovereenkomst
export interface SamenlevingsovereenkomstFormData extends BaseFormData {
  document_type: 'samenlevingsovereenkomst'
  partner1_naam: string
  partner1_geboortedatum: string
  partner1_adres: string
  partner2_naam: string
  partner2_geboortedatum: string
  partner2_adres: string
  datum_samenwonen: string
  adres: string
  vermogensregeling: 'koude_uitsluiting' | 'beperkte_gemeenschap'
  gemeenschappelijke_woning: boolean
  woning_eigenaar: 'partner1' | 'partner2' | 'gezamenlijk'
  inboedelverdeling: boolean
  pensioenregeling: boolean
  partnerpensioen: boolean
  alimentatie: boolean
  verblijvingsbeding: boolean
}

// Splitsingsakte
export interface SplitsingsakteFormData extends BaseFormData {
  document_type: 'splitsingsakte'
  adres: string
  kadastrale_aanduiding: string
  aantal_appartementen: number
  vve_naam: string
  bouwjaar: string
  eigenaar_naam: string
  erfpacht: boolean
  erfpacht_type: 'eeuwigdurend' | 'tijdelijk'
}

export type TransactieFormData = KoopovereenkomstFormData | SamenlevingsovereenkomstFormData | SplitsingsakteFormData

export interface ClausuleData {
  id: string
  document_type: string
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

export const defaultKoopovereenkomst: KoopovereenkomstFormData = {
  document_type: 'koopovereenkomst',
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

export const defaultSamenlevingsovereenkomst: SamenlevingsovereenkomstFormData = {
  document_type: 'samenlevingsovereenkomst',
  partner1_naam: '',
  partner1_geboortedatum: '',
  partner1_adres: '',
  partner2_naam: '',
  partner2_geboortedatum: '',
  partner2_adres: '',
  datum_samenwonen: '',
  adres: '',
  vermogensregeling: 'koude_uitsluiting',
  gemeenschappelijke_woning: false,
  woning_eigenaar: 'gezamenlijk',
  inboedelverdeling: false,
  pensioenregeling: false,
  partnerpensioen: false,
  alimentatie: false,
  verblijvingsbeding: false,
}

export const defaultSplitsingsakte: SplitsingsakteFormData = {
  document_type: 'splitsingsakte',
  adres: '',
  kadastrale_aanduiding: '',
  aantal_appartementen: 2,
  vve_naam: '',
  bouwjaar: '',
  eigenaar_naam: '',
  erfpacht: false,
  erfpacht_type: 'eeuwigdurend',
}

export function getDefaultFormData(type: DocumentType): TransactieFormData {
  switch (type) {
    case 'koopovereenkomst': return { ...defaultKoopovereenkomst }
    case 'samenlevingsovereenkomst': return { ...defaultSamenlevingsovereenkomst }
    case 'splitsingsakte': return { ...defaultSplitsingsakte }
  }
}

export const documentTypeLabels: Record<DocumentType, string> = {
  koopovereenkomst: 'Koopovereenkomst',
  samenlevingsovereenkomst: 'Samenlevingsovereenkomst',
  splitsingsakte: 'Splitsingsakte',
}

export const documentTypeDescriptions: Record<DocumentType, string> = {
  koopovereenkomst: 'Koopovereenkomst voor woningen volgens het Amsterdams Ring model',
  samenlevingsovereenkomst: 'Samenlevingsovereenkomst voor ongehuwd samenwonenden',
  splitsingsakte: 'Splitsingsakte voor appartementsgebouwen',
}
