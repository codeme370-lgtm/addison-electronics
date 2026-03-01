import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"

export async function GET(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)
    if (!storeId) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    const reports = await prisma.deliveryReport.findMany({
      where: { storeId },
      include: { order: { include: { orderItems: { include: { product: true } }, user: true } }, user: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ reports }, { status: 200 })
  } catch (error) {
    console.error('delivery-reports error', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
