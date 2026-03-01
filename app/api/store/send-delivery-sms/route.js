import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"

export async function POST(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)
    if (!storeId) return NextResponse.json({ message: "You are not authorized to perform this action" }, { status: 403 })

    const { orderId, hours, message } = await request.json()
    if (!orderId || !hours) return NextResponse.json({ error: "orderId and hours are required" }, { status: 400 })

    const order = await prisma.order.findFirst({
      where: { id: orderId, storeId },
      include: { address: true, orderItems: { include: { product: true } }, user: true }
    })
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })

    const phone = order.address?.phone
    if (!phone) return NextResponse.json({ error: "Customer phone number missing" }, { status: 400 })

    // Build a concise product list for the SMS
    const productNames = (order.orderItems || []).map(i => i.product?.name).filter(Boolean)
    const previewList = productNames.slice(0, 3).join(', ') + (productNames.length > 3 ? '...' : '')
    const shortId = order.id?.slice(0, 8)
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Jeeshop'

    const defaultMessage = `Hello ${order.user?.name || ''}, thanks for buying ${previewList || 'your items'} from ${siteName}. Your order #${shortId} will be delivered within the next ${hours} hours. We'll notify you if anything changes — ${siteName}`
    const smsBody = (message && message.trim().length > 0) ? message : defaultMessage

    // persist delivery window and deadline on the order
    try {
      const deadline = new Date(Date.now() + Number(hours) * 3600 * 1000)
      await prisma.order.update({ where: { id: orderId }, data: { deliveryWindowHours: Number(hours), deliveryDeadline: deadline, deliveryConfirmed: false } })
    } catch (uErr) {
      console.error('Failed to persist delivery deadline', uErr)
    }

    // Update order with delivery window and deadline
    try {
      const deadline = new Date(Date.now() + Number(hours) * 3600 * 1000)
      await prisma.order.update({ where: { id: order.id }, data: { deliveryWindowHours: Number(hours), deliveryDeadline: deadline } })
    } catch (updErr) {
      console.error('Failed to update order delivery fields', updErr)
    }

    // Try Vonage (Nexmo) first if configured, then Textbelt as a last-resort fallback.
    let sent = false
    let lastError = null

    // Try Vonage (Nexmo) if configured (lower-cost commercial provider)
    if (process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET && process.env.VONAGE_FROM) {
      try {
        const axios = require('axios')
        const payload = {
          api_key: process.env.VONAGE_API_KEY,
          api_secret: process.env.VONAGE_API_SECRET,
          to: phone,
          from: process.env.VONAGE_FROM,
          text: smsBody
        }
        const resp = await axios.post('https://rest.nexmo.com/sms/json', payload)
        if (resp?.data && resp.data.messages && resp.data.messages[0] && resp.data.messages[0].status === '0') {
          sent = true
        } else {
          console.error('Vonage rejected message', resp?.data)
          lastError = resp?.data || lastError
        }
      } catch (vErr) {
        console.error('Failed to send SMS via Vonage', vErr)
        lastError = vErr
      }
    }

    if (!sent) {
      // Try Vonage (Nexmo) if configured (lower-cost commercial provider)
      if (process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET && process.env.VONAGE_FROM) {
        try {
          const axios = require('axios')
          const payload = {
            api_key: process.env.VONAGE_API_KEY,
            api_secret: process.env.VONAGE_API_SECRET,
            to: phone,
            from: process.env.VONAGE_FROM,
            text: smsBody
          }
          const resp = await axios.post('https://rest.nexmo.com/sms/json', payload)
          if (resp?.data && resp.data.messages && resp.data.messages[0] && resp.data.messages[0].status === '0') {
            sent = true
          } else {
            console.error('Vonage rejected message', resp?.data)
            lastError = resp?.data || lastError
          }
        } catch (vErr) {
          console.error('Failed to send SMS via Vonage', vErr)
          lastError = vErr
        }
      }

      // If still not sent, attempt Textbelt as last-resort free fallback.
      if (!sent) {
        try {
          const axios = require('axios')
          const key = process.env.TEXTBELT_KEY || 'textbelt'
          const resp = await axios.post('https://textbelt.com/text', { phone, message: smsBody, key })
          if (resp?.data?.success) {
            sent = true
          } else {
            console.error('Textbelt rejected message', resp?.data)
            lastError = resp?.data || lastError
          }
        } catch (tbErr) {
          console.error('Failed to send SMS via Textbelt', tbErr)
          lastError = tbErr
        }
      }
    }

    if (!sent) {
      console.error('All SMS providers failed', lastError)
      return NextResponse.json({ error: 'Failed to send SMS via all providers' }, { status: 500 })
    }

    return NextResponse.json({ message: 'SMS queued/sent', phone }, { status: 200 })
  } catch (error) {
    console.error('send-delivery-sms error', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
