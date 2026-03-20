import {
  TransactieFormData,
  ClausuleData,
  KoopovereenkomstFormData,
  SamenlevingsovereenkomstFormData,
  SplitsingsakteFormData,
} from './types'

interface TriggerConditie {
  [key: string]: boolean | string | number
}

export function shouldClausuleBeActive(
  clausule: ClausuleData,
  formData: TransactieFormData
): boolean {
  const conditie: TriggerConditie = JSON.parse(clausule.trigger_conditie)

  if (Object.keys(conditie).length === 0) return true

  return Object.entries(conditie).every(([key, value]) => {
    const formValue = (formData as unknown as Record<string, unknown>)[key]
    return formValue === value
  })
}

export function formatBedrag(centen: number): string {
  const euros = centen / 100
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(euros)
}

function replaceAll(template: string, replacements: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
  }
  return result
}

function getKoopReplacements(data: KoopovereenkomstFormData): Record<string, string> {
  const koopprijs = formatBedrag(data.koopprijs)
  return {
    verkoper: data.verkoper_naam || '[verkoper]',
    koper: data.koper_naam || '[koper]',
    adres: data.adres || '[adres]',
    kadastrale_aanduiding: data.kadastrale_aanduiding || '[kadastrale aanduiding]',
    koopprijs: koopprijs,
    koopprijs_voluit: koopprijs,
    leveringsdatum: data.leveringsdatum || '[leveringsdatum]',
    waarborgsom: formatBedrag(Math.round(data.koopprijs * 0.1)),
    boetebedrag: formatBedrag(Math.round(data.koopprijs * 0.1)),
    financieringstermijn: String(data.financieringstermijn_weken),
  }
}

function getSamenlevingReplacements(data: SamenlevingsovereenkomstFormData): Record<string, string> {
  return {
    partner1: data.partner1_naam || '[partner 1]',
    partner2: data.partner2_naam || '[partner 2]',
    partner1_geboortedatum: data.partner1_geboortedatum || '[geboortedatum partner 1]',
    partner2_geboortedatum: data.partner2_geboortedatum || '[geboortedatum partner 2]',
    partner1_adres: data.partner1_adres || '[adres partner 1]',
    partner2_adres: data.partner2_adres || '[adres partner 2]',
    datum_samenwonen: data.datum_samenwonen || '[datum samenwonen]',
    adres: data.adres || '[adres]',
  }
}

function getSplitsingReplacements(data: SplitsingsakteFormData): Record<string, string> {
  return {
    adres: data.adres || '[adres]',
    kadastrale_aanduiding: data.kadastrale_aanduiding || '[kadastrale aanduiding]',
    aantal_appartementen: String(data.aantal_appartementen || '[aantal]'),
    vve_naam: data.vve_naam || '[naam VvE]',
    bouwjaar: data.bouwjaar || '[bouwjaar]',
    eigenaar: data.eigenaar_naam || '[eigenaar]',
  }
}

function getReplacements(formData: TransactieFormData): Record<string, string> {
  switch (formData.document_type) {
    case 'koopovereenkomst':
      return getKoopReplacements(formData)
    case 'samenlevingsovereenkomst':
      return getSamenlevingReplacements(formData)
    case 'splitsingsakte':
      return getSplitsingReplacements(formData)
  }
}

export function renderClausuleTekst(
  template: string,
  formData: TransactieFormData
): string {
  return replaceAll(template, getReplacements(formData))
}

export function renderClausuleTekstWithHighlights(
  template: string,
  formData: TransactieFormData
): string {
  const replacements = getReplacements(formData)
  const highlighted: Record<string, string> = {}
  for (const [key, value] of Object.entries(replacements)) {
    highlighted[key] = `<span class="highlight-var">${value}</span>`
  }
  return replaceAll(template, highlighted)
}
