import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Sync clausules based on form data
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { activeClausuleIds } = await request.json() as { activeClausuleIds: string[] }

  // Get current transaction clausules
  const existing = await prisma.transactieClausule.findMany({
    where: { transactie_id: params.id },
  })

  const existingMap = new Map(existing.map(tc => [tc.clausule_id, tc]))

  // Add new clausules
  for (const clausuleId of activeClausuleIds) {
    if (!existingMap.has(clausuleId)) {
      await prisma.transactieClausule.create({
        data: {
          transactie_id: params.id,
          clausule_id: clausuleId,
          actief: true,
        },
      })
    }
  }

  // Deactivate clausules that should no longer be active (but keep custom ones)
  const entries = Array.from(existingMap.entries())
  for (const [clausuleId, tc] of entries) {
    if (!activeClausuleIds.includes(clausuleId) && !tc.aangepaste_tekst) {
      await prisma.transactieClausule.delete({
        where: { id: tc.id },
      })
    } else if (!activeClausuleIds.includes(clausuleId)) {
      await prisma.transactieClausule.update({
        where: { id: tc.id },
        data: { actief: false },
      })
    } else {
      await prisma.transactieClausule.update({
        where: { id: tc.id },
        data: { actief: true },
      })
    }
  }

  // Fetch updated
  const updated = await prisma.transactieClausule.findMany({
    where: { transactie_id: params.id },
    include: { clausule: true },
    orderBy: { clausule: { volgorde: 'asc' } },
  })

  return NextResponse.json(updated)
}

// Update a specific transactie-clausule
export async function PUT(
  request: NextRequest,
) {
  const { id, aangepaste_tekst, actief } = await request.json()

  const updated = await prisma.transactieClausule.update({
    where: { id },
    data: {
      ...(aangepaste_tekst !== undefined && { aangepaste_tekst }),
      ...(actief !== undefined && { actief }),
    },
    include: { clausule: true },
  })

  return NextResponse.json(updated)
}
