import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
  TabStopPosition,
  TabStopType,
} from 'docx'
import { TransactieFormData, TransactieClausuleData } from './types'
import { renderClausuleTekst } from './clausule-engine'

export async function generateDocx(
  formData: TransactieFormData,
  transactieClausules: TransactieClausuleData[]
): Promise<Blob> {
  const activeClausules = transactieClausules.filter(tc => tc.actief)

  const children: Paragraph[] = []

  // Title
  children.push(
    new Paragraph({
      text: 'KOOPOVEREENKOMST',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  )

  // Subtitle
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: `betreffende het registergoed gelegen te ${formData.adres || '[adres]'}`,
          size: 22,
          italics: true,
        }),
      ],
    })
  )

  // Parties
  children.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'De ondergetekenden:', size: 22 })],
    })
  )

  children.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: '1. ', size: 22 }),
        new TextRun({ text: formData.verkoper_naam || '[verkoper]', size: 22, bold: true }),
        new TextRun({ text: ', hierna te noemen: "verkoper"', size: 22 }),
      ],
    })
  )

  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: '2. ', size: 22 }),
        new TextRun({ text: formData.koper_naam || '[koper]', size: 22, bold: true }),
        new TextRun({ text: ', hierna te noemen: "koper"', size: 22 }),
      ],
    })
  )

  children.push(
    new Paragraph({
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: 'verklaren het volgende te zijn overeengekomen:',
          size: 22,
        }),
      ],
    })
  )

  // Clausules
  for (const tc of activeClausules) {
    const tekst = tc.aangepaste_tekst || renderClausuleTekst(tc.clausule.tekst_template, formData)

    // Article header
    children.push(
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: `${tc.clausule.artikelnummer} — ${tc.clausule.naam}`,
            size: 22,
            bold: true,
          }),
        ],
      })
    )

    // Article text - split by paragraphs
    const paragraphs = tekst.split('\n\n')
    for (const p of paragraphs) {
      const trimmed = p.trim()
      if (trimmed) {
        children.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: trimmed, size: 22, font: 'Georgia' })],
          })
        )
      }
    }
  }

  // Signature block
  children.push(
    new Paragraph({
      spacing: { before: 600, after: 400 },
      children: [
        new TextRun({
          text: 'Aldus overeengekomen en in tweevoud opgemaakt te Amsterdam,',
          size: 22,
        }),
      ],
    })
  )

  children.push(new Paragraph({ spacing: { after: 100 }, children: [] }))

  children.push(
    new Paragraph({
      spacing: { after: 600 },
      children: [
        new TextRun({ text: 'Verkoper:', size: 22 }),
        new TextRun({ text: '\t\t\t\t', size: 22 }),
        new TextRun({ text: 'Koper:', size: 22 }),
      ],
      tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
    })
  )

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: '________________________', size: 22 }),
        new TextRun({ text: '\t\t', size: 22 }),
        new TextRun({ text: '________________________', size: 22 }),
      ],
    })
  )

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: formData.verkoper_naam || '[naam verkoper]', size: 18, italics: true }),
        new TextRun({ text: '\t\t\t\t', size: 18 }),
        new TextRun({ text: formData.koper_naam || '[naam koper]', size: 18, italics: true }),
      ],
    })
  )

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  })

  return await Packer.toBlob(doc)
}
