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
  const data = await request.json()

  const transactie = await prisma.transactie.update({
    where: { id: params.id },
    data,
    include: {
      clausules: {
        include: { clausule: true },
        orderBy: { clausule: { volgorde: 'asc' } },
      },
    },
  })

  return NextResponse.json(transactie)
}
