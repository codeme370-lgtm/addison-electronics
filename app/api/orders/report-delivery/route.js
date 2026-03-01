import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { inngest } from '@/lib/inngest'

export async function POST(request) {
  try {
    const { userId } = getAuth(request)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { orderId, status } = await request.json()
    if (!orderId || !status) return NextResponse.json({ error: 'orderId and status are required' }, { status: 400 })
    const allowed = ['RECEIVED', 'NOT_RECEIVED']
    if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

    // ensure order belongs to user
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    if (order.userId !== userId) return NextResponse.json({ error: 'Unauthorized for this order' }, { status: 403 })

    // create delivery report
    const report = await prisma.deliveryReport.create({
      data: {
        orderId,
        storeId: order.storeId,
        userId,
        status
      }
    })

    // Fire an Inngest event so background functions can notify the store (push, analytics, etc.)
    try {
      await inngest.send({ name: 'app/delivery.report', data: report })
    } catch (ie) {
      console.warn('Failed to send inngest event for delivery report:', ie?.message || ie)
    }

    // update order.deliveryConfirmed when received
    if (status === 'RECEIVED') {
      await prisma.order.update({ where: { id: orderId }, data: { deliveryConfirmed: true, status: 'DELIVERED' } })
    }

    return NextResponse.json({ message: 'Report saved', report }, { status: 201 })
  } catch (error) {
    console.error('report-delivery error', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
