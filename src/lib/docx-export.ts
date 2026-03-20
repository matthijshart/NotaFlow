import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
} from 'docx'
import {
  TransactieFormData,
  TransactieClausuleData,
  KoopovereenkomstFormData,
  SamenlevingsovereenkomstFormData,
  SplitsingsakteFormData,
} from './types'
import { renderClausuleTekst } from './clausule-engine'

function p(text: string, options?: { bold?: boolean; italic?: boolean; size?: number; font?: string }): Paragraph {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({
      text,
      size: options?.size || 22,
      bold: options?.bold,
      italics: options?.italic,
      font: options?.font || 'Georgia',
    })],
  })
}

function heading(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  })
}

function subtitle(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text, size: 22, italics: true })],
  })
}

function partij(num: string, naam: string, rol: string, extra?: string): Paragraph {
  const children = [
    new TextRun({ text: `${num} `, size: 22 }),
    new TextRun({ text: naam, size: 22, bold: true }),
    new TextRun({ text: `, ${extra || ''}hierna te noemen: "${rol}"`, size: 22 }),
  ]
  return new Paragraph({ spacing: { after: 100 }, children })
}

function signatuurBlok(links: string, rechts: string, linksNaam: string, rechtsNaam: string): Paragraph[] {
  return [
    new Paragraph({ spacing: { before: 600, after: 400 }, children: [] }),
    new Paragraph({
      spacing: { after: 600 },
      children: [
        new TextRun({ text: `${links}:`, size: 22 }),
        new TextRun({ text: '\t\t\t\t', size: 22 }),
        new TextRun({ text: `${rechts}:`, size: 22 }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '________________________', size: 22 }),
        new TextRun({ text: '\t\t', size: 22 }),
        new TextRun({ text: '________________________', size: 22 }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: linksNaam, size: 18, italics: true }),
        new TextRun({ text: '\t\t\t\t', size: 18 }),
        new TextRun({ text: rechtsNaam, size: 18, italics: true }),
      ],
    }),
  ]
}

function koopHeader(data: KoopovereenkomstFormData): Paragraph[] {
  return [
    heading('KOOPOVEREENKOMST'),
    subtitle(`Amsterdams Ring Model — betreffende het registergoed gelegen te ${data.adres || '[adres]'}`),
    p('De ondergetekenden:'),
    partij('1.', data.verkoper_naam || '[verkoper]', 'verkoper'),
    partij('2.', data.koper_naam || '[koper]', 'koper'),
    new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: 'verklaren het volgende te zijn overeengekomen:', size: 22 })] }),
  ]
}

function koopFooter(data: KoopovereenkomstFormData): Paragraph[] {
  return [
    p('Aldus overeengekomen en in tweevoud opgemaakt te Amsterdam,'),
    ...signatuurBlok('Verkoper', 'Koper', data.verkoper_naam || '[verkoper]', data.koper_naam || '[koper]'),
  ]
}

function samenlevingHeader(data: SamenlevingsovereenkomstFormData): Paragraph[] {
  return [
    heading('SAMENLEVINGSOVEREENKOMST'),
    p('De ondergetekenden:'),
    partij('1.', data.partner1_naam || '[partner 1]', 'partner 1',
      `geboren op ${data.partner1_geboortedatum || '[datum]'}, `),
    partij('2.', data.partner2_naam || '[partner 2]', 'partner 2',
      `geboren op ${data.partner2_geboortedatum || '[datum]'}, `),
    new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: 'verklaren de volgende samenlevingsovereenkomst aan te gaan:', size: 22 })] }),
  ]
}

function samenlevingFooter(data: SamenlevingsovereenkomstFormData): Paragraph[] {
  return [
    p('Aldus overeengekomen en in tweevoud opgemaakt en ondertekend te Amsterdam,'),
    ...signatuurBlok('Partner 1', 'Partner 2', data.partner1_naam || '[partner 1]', data.partner2_naam || '[partner 2]'),
  ]
}

function splitsingHeader(data: SplitsingsakteFormData): Paragraph[] {
  return [
    heading('AKTE VAN SPLITSING IN APPARTEMENTSRECHTEN'),
    subtitle(`betreffende het gebouw gelegen te ${data.adres || '[adres]'}`),
    p('Heden verscheen voor mij, notaris te Amsterdam:'),
    partij('', data.eigenaar_naam || '[eigenaar]', 'de eigenaar'),
    new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: 'De eigenaar verklaart het hierna te omschrijven gebouw te splitsen in appartementsrechten als volgt:', size: 22 })] }),
  ]
}

function splitsingFooter(data: SplitsingsakteFormData): Paragraph[] {
  return [
    p('Waarvan akte, verleden te Amsterdam.'),
    ...signatuurBlok('De eigenaar', 'De notaris', data.eigenaar_naam || '[eigenaar]', '[naam notaris]'),
  ]
}

export async function generateDocx(
  formData: TransactieFormData,
  transactieClausules: TransactieClausuleData[]
): Promise<Blob> {
  const activeClausules = transactieClausules.filter(tc => tc.actief)
  const children: Paragraph[] = []

  // Header per document type
  switch (formData.document_type) {
    case 'koopovereenkomst':
      children.push(...koopHeader(formData))
      break
    case 'samenlevingsovereenkomst':
      children.push(...samenlevingHeader(formData))
      break
    case 'splitsingsakte':
      children.push(...splitsingHeader(formData))
      break
  }

  // Clausules
  for (const tc of activeClausules) {
    const tekst = tc.aangepaste_tekst || renderClausuleTekst(tc.clausule.tekst_template, formData)

    children.push(
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [new TextRun({
          text: `${tc.clausule.artikelnummer} — ${tc.clausule.naam}`,
          size: 22,
          bold: true,
        })],
      })
    )

    const paragraphs = tekst.split('\n\n')
    for (const par of paragraphs) {
      const trimmed = par.trim()
      if (trimmed) {
        children.push(new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({ text: trimmed, size: 22, font: 'Georgia' })],
        }))
      }
    }
  }

  // Footer per document type
  switch (formData.document_type) {
    case 'koopovereenkomst':
      children.push(...koopFooter(formData))
      break
    case 'samenlevingsovereenkomst':
      children.push(...samenlevingFooter(formData))
      break
    case 'splitsingsakte':
      children.push(...splitsingFooter(formData))
      break
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      children,
    }],
  })

  return await Packer.toBlob(doc)
}
