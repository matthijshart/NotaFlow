import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const document_type = searchParams.get('document_type')

  const clausules = await prisma.clausule.findMany({
    where: document_type ? { document_type } : undefined,
    orderBy: { volgorde: 'asc' },
  })
  return NextResponse.json(clausules)
}
