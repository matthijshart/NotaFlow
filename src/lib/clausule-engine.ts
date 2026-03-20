import { TransactieFormData, ClausuleData } from './types'

interface TriggerConditie {
  [key: string]: boolean | string
}

export function shouldClausuleBeActive(
  clausule: ClausuleData,
  formData: TransactieFormData
): boolean {
  const conditie: TriggerConditie = JSON.parse(clausule.trigger_conditie)

  // Standaard clausules (empty trigger) are always active
  if (Object.keys(conditie).length === 0) return true

  // Check all conditions
  return Object.entries(conditie).every(([key, value]) => {
    const formValue = formData[key as keyof TransactieFormData]
    return formValue === value
  })
}

export function formatKoopprijs(centen: number): string {
  const euros = centen / 100
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(euros)
}

export function formatKoopprijsVoluit(centen: number): string {
  return formatKoopprijs(centen)
}

export function renderClausuleTekst(
  template: string,
  formData: TransactieFormData
): string {
  const koopprijsFormatted = formatKoopprijs(formData.koopprijs)
  const waarborgsom = formatKoopprijs(Math.round(formData.koopprijs * 0.1))
  const boetebedrag = formatKoopprijs(Math.round(formData.koopprijs * 0.1))

  return template
    .replace(/\{\{verkoper\}\}/g, formData.verkoper_naam || '[verkoper]')
    .replace(/\{\{koper\}\}/g, formData.koper_naam || '[koper]')
    .replace(/\{\{adres\}\}/g, formData.adres || '[adres]')
    .replace(/\{\{kadastrale_aanduiding\}\}/g, formData.kadastrale_aanduiding || '[kadastrale aanduiding]')
    .replace(/\{\{koopprijs\}\}/g, koopprijsFormatted)
    .replace(/\{\{koopprijs_voluit\}\}/g, formatKoopprijsVoluit(formData.koopprijs))
    .replace(/\{\{leveringsdatum\}\}/g, formData.leveringsdatum || '[leveringsdatum]')
    .replace(/\{\{waarborgsom\}\}/g, waarborgsom)
    .replace(/\{\{boetebedrag\}\}/g, boetebedrag)
    .replace(/\{\{financieringstermijn\}\}/g, String(formData.financieringstermijn_weken))
}

export function renderClausuleTekstWithHighlights(
  template: string,
  formData: TransactieFormData
): string {
  const koopprijsFormatted = formatKoopprijs(formData.koopprijs)
  const waarborgsom = formatKoopprijs(Math.round(formData.koopprijs * 0.1))
  const boetebedrag = formatKoopprijs(Math.round(formData.koopprijs * 0.1))

  const wrap = (val: string) => `<span class="highlight-var">${val}</span>`

  return template
    .replace(/\{\{verkoper\}\}/g, wrap(formData.verkoper_naam || '[verkoper]'))
    .replace(/\{\{koper\}\}/g, wrap(formData.koper_naam || '[koper]'))
    .replace(/\{\{adres\}\}/g, wrap(formData.adres || '[adres]'))
    .replace(/\{\{kadastrale_aanduiding\}\}/g, wrap(formData.kadastrale_aanduiding || '[kadastrale aanduiding]'))
    .replace(/\{\{koopprijs\}\}/g, wrap(koopprijsFormatted))
    .replace(/\{\{koopprijs_voluit\}\}/g, wrap(formatKoopprijsVoluit(formData.koopprijs)))
    .replace(/\{\{leveringsdatum\}\}/g, wrap(formData.leveringsdatum || '[leveringsdatum]'))
    .replace(/\{\{waarborgsom\}\}/g, wrap(waarborgsom))
    .replace(/\{\{boetebedrag\}\}/g, wrap(boetebedrag))
    .replace(/\{\{financieringstermijn\}\}/g, wrap(String(formData.financieringstermijn_weken)))
}
