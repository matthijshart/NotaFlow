import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const transactie = await prisma.transactie.findUnique({
    where: { id: params.id },
    include: {
      clausules: {
        include: { clausule: true },
        orderBy: { clausule: { volgorde: 'asc' } },
      },
    },
  })

  if (!transactie) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 })
  }

  return NextResponse.json(transactie)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  // Separate extra_data from standard fields
  const { extra_data, ...standardFields } = body

  const updateData: Record<string, unknown> = {}

  // Only include fields that exist in the Prisma schema
  const allowedFields = [
    'status', 'document_type', 'adres', 'kadastrale_aanduiding', 'type_object',
    'verkoper_naam', 'koper_naam', 'koopprijs', 'leveringsdatum',
    'vve', 'erfpacht', 'erfpacht_type', 'bouwjaar_voor_1992',
    'bouwtechnische_keuring', 'energielabel', 'financieringsvoorbehoud',
    'financieringstermijn_weken', 'nhg', 'bouwkundig_voorbehoud', 'huisvestingsvergunning',
  ]

  for (const key of allowedFields) {
    if (key in standardFields) {
      updateData[key] = standardFields[key]
    }
  }

  // Store document-type-specific data as JSON
  if (extra_data !== undefined) {
    updateData.extra_data = typeof extra_data === 'string' ? extra_data : JSON.stringify(extra_data)
  }

  const transactie = await prisma.transactie.update({
    where: { id: params.id },
    data: updateData,
    include: {
      clausules: {
        include: { clausule: true },
        orderBy: { clausule: { volgorde: 'asc' } },
      },
    },
  })

  return NextResponse.json(transactie)
}
