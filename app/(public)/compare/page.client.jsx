'use client'

import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArrowRight, Columns, Shuffle, Star } from 'lucide-react'
import Link from 'next/link'

export default function ComparePage() {
  const products = useSelector((state) => state.product.list || [])
  const [selectedIds, setSelectedIds] = useState(['tn-001', 'tn-002'])

  const selectedProducts = useMemo(() => {
    return products.filter((product) => selectedIds.includes(product.id)).slice(0, 3)
  }, [products, selectedIds])

  const handleToggle = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id)
      return prev.length < 3 ? [...prev, id] : prev
    })
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Compare products</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Find the best match fast</h1>
              <p className="mt-4 max-w-2xl text-slate-400">Select products to compare key specs, pricing, and availability side-by-side.</p>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
              Pick products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold text-white">Choose items to compare</h2>
              <div className="mt-6 grid gap-3">
                {products.slice(0, 8).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleToggle(product.id)}
                    className={`w-full rounded-3xl border px-4 py-4 text-left text-sm transition ${selectedIds.includes(product.id) ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-violet-500 hover:bg-slate-950'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{product.name}</span>
                      {selectedIds.includes(product.id) && <Columns size={18} className="text-violet-300" />}
                    </div>
                    <p className="mt-2 text-slate-500">{product.brand} • {product.category}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold text-white">Comparison preview</h2>
              {selectedProducts.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[720px] grid gap-4 text-sm">
                    <div className="grid grid-cols-[2.5fr_repeat(3,1fr)] gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-slate-400">
                      <span className="font-semibold text-slate-100">Feature</span>
                      {selectedProducts.map((product) => (
                        <span key={product.id} className="font-semibold text-slate-100">{product.name}</span>
                      ))}
                    </div>
                    {[
                      { label: 'Price', key: 'price' },
                      { label: 'Brand', key: 'brand' },
                      { label: 'Availability', key: 'quantity' },
                      { label: 'Rating', key: 'rating' },
                      { label: 'Highlights', key: 'highlight' },
                    ].map((row) => (
                      <div key={row.key} className="grid grid-cols-[2.5fr_repeat(3,1fr)] gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                        <span className="text-slate-400">{row.label}</span>
                        {selectedProducts.map((product) => (
                          <span key={product.id} className="text-slate-100">
                            {row.key === 'quantity'
                              ? product.quantity > 0 ? 'In Stock' : 'Out of Stock'
                              : row.key === 'rating'
                              ? `${product.rating || 0}★`
                              : product[row.key] || '—'}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-400">
                  <p>Select up to three products to compare. Use the shop page to add items to your comparison list.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
