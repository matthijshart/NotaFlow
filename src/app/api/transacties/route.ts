import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const document_type = body.document_type || 'koopovereenkomst'

  const transactie = await prisma.transactie.create({
    data: { document_type },
    include: { clausules: { include: { clausule: true } } },
  })
  return NextResponse.json(transactie)
}

export async function GET() {
  const transacties = await prisma.transactie.findMany({
    orderBy: { aangemaakt_op: 'desc' },
  })
  return NextResponse.json(transacties)
}
