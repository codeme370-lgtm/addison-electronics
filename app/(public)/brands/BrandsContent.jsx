'use client'

import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Sparkles, Search, ChevronDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import SideDrawer from '../../../components/SideDrawer'

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS'

export default function BrandsContent() {
  const products = useSelector((state) => state.product.list || [])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const brandGroups = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!product.brand) return acc
      if (!acc[product.brand]) acc[product.brand] = []
      acc[product.brand].push(product)
      return acc
    }, {})
  }, [products])

  const brandEntries = Object.entries(brandGroups).sort((a, b) => b[1].length - a[1].length)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Home / Brands</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Top Brands</h1>
              <p className="mt-4 max-w-2xl text-slate-400">Shop products from the world's most trusted tech brands.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
              <Sparkles size={18} className="text-violet-300" /> Top brands
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Left sidebar for filters (desktop) */}
            <aside className="hidden lg:block">
              <div className="rounded-[16px] border border-slate-800 bg-slate-950/80 p-4">
                <div className="mb-4">
                  <label className="relative block">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><Search size={16} /></span>
                    <input placeholder="Search brands..." className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-violet-500/20" />
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Category</p>
                    <div className="mt-3 space-y-2">
                      <button className="w-full text-left rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-300">All Categories <span className="float-right text-slate-500">85</span></button>
                      {['Laptops','Components','Peripherals','Gaming','Audio','Accessories'].map((c) => (
                        <button key={c} className="w-full text-left rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">{c} <span className="float-right text-slate-500">12</span></button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Popular Brands</p>
                    <div className="mt-3 grid gap-2">
                      {brandEntries.slice(0,6).map(([brand, items]) => (
                        <label key={brand} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                          <input type="checkbox" className="h-4 w-4 accent-violet-500" />
                          <span className="flex-1">{brand}</span>
                          <span className="text-slate-500">{items.length}</span>
                        </label>
                      ))}
                    </div>
                    <button className="mt-2 text-sm text-violet-300">View More</button>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Sort By</p>
                    <div className="mt-3 space-y-2">
                      {['Popular','Name A - Z','Name Z - A','Newest'].map((s) => (
                        <label key={s} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                          <input name="sort" type="radio" className="h-4 w-4 accent-violet-500" />
                          {s}
                        </label>
                      ))}
                    </div>
                    <button className="mt-3 w-full rounded-3xl bg-slate-800/60 px-4 py-3 text-sm text-slate-300">Clear All</button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-400">Showing 1-24 of {brandEntries.length} brands</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white lg:hidden">
                    <Filter size={16} /> Filter
                  </button>
                  <select className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                    <option>Sort by: Popular</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {brandEntries.map(([brand, items]) => (
                  <div key={brand} className="rounded-[20px] border border-slate-800 bg-slate-950/80 p-6 text-center">
                    <div className="h-28 flex items-center justify-center mb-4">
                      <div className="h-16 w-32 bg-slate-900/60 rounded-md flex items-center justify-center text-white font-semibold">{brand}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{brand}</h3>
                    <p className="mt-2 text-sm text-slate-400">{items.length} Products</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => <svg key={i} className="h-4 w-4" />)}
                    </div>
                    <Link href="/shop" className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white">View Products <ArrowRight size={14} /></Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button className="rounded-full border border-slate-800 bg-slate-900/80 p-3"><ChevronLeft /></button>
                <div className="inline-flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-violet-600 text-white">1</button>
                  <button className="w-8 h-8 rounded-full border border-slate-800 text-slate-300">2</button>
                  <button className="w-8 h-8 rounded-full border border-slate-800 text-slate-300">3</button>
                </div>
                <button className="rounded-full border border-slate-800 bg-slate-900/80 p-3"><ChevronRight /></button>
              </div>
            </section>
          </div>

          {/* Perks footer */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { title: '100% Authentic Products', desc: 'Direct from official brands' },
              { title: 'Best Price Guarantee', desc: 'We match any price' },
              { title: 'Secure Checkout', desc: '100% secure payment' },
              { title: 'Free Worldwide Shipping', desc: `On orders over ${currency}99` },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-center">
                <p className="font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SideDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)}>
        {/* mobile filters content */}
        <div className="space-y-4">
          <div className="relative block">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><Search size={16} /></span>
            <input placeholder="Search brands..." className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-slate-200 outline-none" />
          </div>
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Popular Brands</p>
            {brandEntries.slice(0, 12).map(([brand, items]) => (
              <label key={brand} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                <input type="checkbox" className="h-4 w-4 accent-violet-500" />
                <span className="flex-1">{brand}</span>
                <span className="text-slate-500">{items.length}</span>
              </label>
            ))}
          </div>
        </div>
      </SideDrawer>
    </main>
  )
}
