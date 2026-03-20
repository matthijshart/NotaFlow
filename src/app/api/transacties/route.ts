import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const transactie = await prisma.transactie.create({
    data: {},
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
