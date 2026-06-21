'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import OrderSummary from '@/components/OrderSummary'
import { ArrowRight, CreditCard, MapPin, ShieldCheck } from 'lucide-react'

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cartItems || {})
  const products = useSelector((state) => state.product.list || [])

  const items = useMemo(() => {
    if (Array.isArray(cart)) {
      return cart.map((item) => ({ id: item.id, quantity: item.quantity || 1 }))
    }

    return Object.entries(cart).map(([id, value]) => ({ id, quantity: value?.quantity || 1 }))
  }, [cart])

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find((product) => product.id === item.id)
      return sum + (product?.price || 0) * (item.quantity || 1)
    }, 0)
  }, [items, products])

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl font-semibold">Your checkout is empty</h1>
          <p className="mt-4 text-slate-400">Add items to your cart before you continue to checkout.</p>
          <Link href="/shop" className="mt-8 inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 xl:grid-cols-[1.65fr_0.95fr]">
          <section className="space-y-6 rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Express checkout</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Fast, secure, and simple payment flow</h1>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                <ShieldCheck size={20} className="text-emerald-300" /> 100% secure checkout
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6">
                <h2 className="text-xl font-semibold text-white">Billing details</h2>
                <p className="mt-3 text-sm text-slate-400">Choose an address, payment method, and confirm your order.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                    <p className="text-sm text-slate-400">Shipping address</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-200">
                      <p className="font-medium">Alex Johnson</p>
                      <p>123 West 45th Street, Apt 12B</p>
                      <p>New York, NY 10036</p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                    <p className="text-sm text-slate-400">Payment method</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-200">
                      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3">Paystack</div>
                      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3">Cash on Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6">
                <h2 className="text-xl font-semibold text-white">Order steps</h2>
                <ol className="mt-6 space-y-4 text-sm text-slate-400">
                  {[
                    'Cart review',
                    'Billing information',
                    'Payment method selection',
                    'Order confirmation',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <aside>
            <OrderSummary totalPrice={totalPrice} items={items} />
          </aside>
        </div>
      </div>
    </main>
  )
}
