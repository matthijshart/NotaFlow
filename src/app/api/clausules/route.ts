import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const clausules = await prisma.clausule.findMany({
    orderBy: { volgorde: 'asc' },
  })
  return NextResponse.json(clausules)
}
