'use client'

import Link from 'next/link';
import { Apple, ArrowRight, CreditCard, Heart, Minus, Plus, ShieldCheck, Sparkles, Truck, X } from 'lucide-react';
import { useState } from 'react';

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';

const initialItems = [
  {
    id: 'cart-1',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    subtitle: '14" QHD+ | Ryzen 9 7940HS | 16GB RAM | 1TB SSD | RTX 4060',
    price: 1499.0,
    quantity: 1,
    status: 'In Stock',
    badge: 'Video Guide Available',
  },
  {
    id: 'cart-2',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    subtitle: 'Silver | Noise Cancelling | 30h Battery',
    price: 348.0,
    quantity: 1,
    status: 'In Stock',
  },
  {
    id: 'cart-3',
    name: 'ASUS ROG Gladius III Wireless Gaming Mouse',
    subtitle: 'Black | 19K DPI | 2.4GHz | 79g',
    price: 129.99,
    quantity: 1,
    status: 'Only 2 left in stock',
  },
];

const recommendations = [
  { title: 'HAVIT HV-F2066 Laptop Cooling Pad', price: `${currency}39.99`, oldPrice: `${currency}59.99` },
  { title: 'ROG Sheath Gaming Mouse Pad', price: `${currency}19.99`, oldPrice: `${currency}29.99` },
  { title: 'ASUS ROG Ranger Gaming Backpack', price: `${currency}79.99`, oldPrice: `${currency}99.99` },
];

export default function CartClient() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your Cart</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Your Cart ({items.length} items)</h1>
              <p className="mt-2 text-slate-400">Review your items and proceed to secure checkout</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <ShieldCheck size={18} /> 100% Secure Checkout
            </div>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.7fr_0.95fr]">
            <section className="space-y-6 rounded-[32px] border border-slate-800 bg-slate-950/90 p-6">
              <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/90 px-5 py-4 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-violet-500 focus:ring-violet-500" checked readOnly />
                  <span>Select All ({items.length} items)</span>
                </div>
                <div className="hidden items-center gap-5 text-slate-400 md:flex">
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-950 text-slate-500">IMG</div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                          </div>
                          <p className="text-sm text-slate-400">{item.subtitle}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                            <span className="rounded-full border border-slate-700 px-3 py-1">{item.status}</span>
                            {item.badge && <span className="rounded-full border border-slate-700 px-3 py-1">{item.badge}</span>}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                            <button className="rounded-full border border-slate-700 px-3 py-2 transition hover:border-violet-500">Move to Wishlist</button>
                            <button className="rounded-full border border-slate-700 px-3 py-2 transition hover:border-rose-500">Remove</button>
                          </div>
                        </div>
                      </div>

                      <div className="grid w-full gap-4 text-right sm:w-auto sm:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto] lg:text-right">
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Price</p>
                          <p className="mt-2 text-xl font-semibold text-white">{`${currency}${item.price.toFixed(2)}`}</p>
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Quantity</p>
                          <div className="mt-2 inline-flex items-center rounded-full border border-slate-800 bg-slate-950 px-2 py-1">
                            <button onClick={() => handleQuantity(item.id, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800"><Minus size={16} /></button>
                            <span className="mx-4 w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                            <button onClick={() => handleQuantity(item.id, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800"><Plus size={16} /></button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Total</p>
                          <p className="mt-2 text-xl font-semibold text-white">{`${currency}${(item.price * item.quantity).toFixed(2)}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/90 px-5 py-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-violet-400" />
                  Frequently Bought Together
                </div>
                <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100 transition hover:border-violet-500">
                  Add More <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {recommendations.map((product) => (
                  <div key={product.title} className="rounded-[24px] border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-100">
                    <div className="mb-4 h-24 rounded-3xl bg-slate-900"></div>
                    <h3 className="font-semibold text-white">{product.title}</h3>
                    <p className="mt-2 text-slate-400">Add this accessory to complete your setup.</p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">{product.price}</p>
                        <p className="text-xs text-slate-500 line-through">{product.oldPrice}</p>
                      </div>
                      <button className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Order Summary</p>
                    <p className="mt-1 text-2xl font-semibold text-white">Review totals</p>
                  </div>
                  <div className="rounded-full bg-slate-900 px-3 py-2 text-sm text-slate-300">{items.length} items</div>
                </div>

                <div className="mt-6 space-y-4 text-sm text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-100">{`${currency}${subtotal.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-300">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-slate-100">{`${currency}${tax.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl bg-slate-900/90 p-5 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-3xl font-semibold text-white">{`${currency}${total.toFixed(2)}`}</span>
                  </div>
                  <p className="mt-3 text-slate-500">You're saving {`${currency}199.00`} on this order!</p>
                </div>

                <Link href="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                  Proceed to Checkout
                </Link>
                <button className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm text-slate-100 transition hover:border-violet-500 inline-flex items-center justify-center gap-2">
                  <Apple size={18} /> Buy with Apple Pay
                </button>

                <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Have a promo code?</p>
                  <div className="mt-4 flex gap-3">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                    />
                    <button className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">Apply</button>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Estimated Delivery</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
                    <div>
                      <p className="font-semibold text-white">Delivering to:</p>
                      <p>New York, NY 10001</p>
                    </div>
                    <button className="rounded-full border border-slate-700 px-4 py-2 text-slate-300 transition hover:border-violet-500">Change</button>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Truck size={18} className="text-violet-400" />
                        <div>
                          <p className="text-sm text-slate-400">Free Shipping</p>
                          <p className="text-slate-100">5-7 Business Days</p>
                        </div>
                      </div>
                      <span className="text-emerald-300">FREE</span>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-sky-400" />
                        <div>
                          <p className="text-sm text-slate-400">Express Shipping</p>
                          <p className="text-slate-100">2-3 Business Days</p>
                        </div>
                      </div>
                      <span className="text-slate-100">{`${currency}19.99`}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-xs uppercase tracking-[0.25em] text-slate-400 sm:flex-row sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-violet-400" />
                    Free Worldwide Shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    30-Day Easy Returns
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-pink-400" />
                    2 Years Warranty
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
