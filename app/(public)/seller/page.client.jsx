'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Loading from '@/components/Loading'

export default function SellersPage() {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(24)
  const [totalPages, setTotalPages] = useState(1)

  // filters
  const [q, setQ] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [category, setCategory] = useState('')
  const [allCategories, setAllCategories] = useState([])

  const fetchSellers = async (opts = {}) => {
    setLoading(true)
    try {
      const params = {
        page: opts.page || page,
        limit,
        q: opts.q ?? q,
        verified: opts.verified ?? (verifiedOnly ? 'true' : undefined),
        minRating: opts.minRating ?? (minRating || undefined),
        category: opts.category ?? (category || undefined)
      }

      const { data } = await axios.get('/api/seller/list', { params })
      setSellers(data.sellers || [])
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
      if (data.allCategories) setAllCategories(data.allCategories)
    } catch (err) {
      console.error('Failed to load sellers', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSellers({ page: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">Top Sellers</h1>
        <p className="text-slate-600 mb-6">Find trusted sellers and explore their products and categories.</p>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sellers" className="px-3 py-2 border rounded w-full sm:w-64" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border rounded">
            <option value="">All categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="px-3 py-2 border rounded">
            <option value={0}>Min rating</option>
            <option value={1}>1★</option>
            <option value={2}>2★</option>
            <option value={3}>3★</option>
            <option value={4}>4★</option>
            <option value={4.5}>4.5★</option>
          </select>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
            <span className="text-sm">Verified only</span>
          </label>
          <div className="ml-auto flex gap-2">
            <button onClick={() => { setPage(1); fetchSellers({ page:1, q, verified: verifiedOnly ? 'true' : undefined, minRating, category }) }} className="px-3 py-2 bg-blue-600 text-white rounded">Apply</button>
            <button onClick={() => { setQ(''); setCategory(''); setMinRating(0); setVerifiedOnly(false); setPage(1); fetchSellers({ page:1, q:'', verified: undefined, minRating:0, category:'' }) }} className="px-3 py-2 border rounded">Clear</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sellers.map(seller => (
            <Link key={seller.id} href={`/seller/${seller.username}`} className="block">
              <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image src={seller.logo || '/favicon.ico'} alt={seller.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{seller.name}</h3>
                    <p className="text-sm text-slate-500">@{seller.username}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{seller.description}</p>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div>
                    <div className="text-slate-700 font-semibold">{seller.averageRating || 0}★</div>
                    <div className="text-xs">{seller.totalProducts} products</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs">{seller.totalFollowers} followers</div>
                    <div className="text-xs">{seller.isVerified ? 'Verified' : ''}</div>
                  </div>
                </div>

                {seller.categories && seller.categories.length > 0 && (
                  <div className="mt-3 text-xs text-slate-500">
                    Categories: {seller.categories.slice(0,3).join(', ')}{seller.categories.length>3? '...' : ''}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button disabled={page<=1} onClick={() => { const p = Math.max(1, page-1); setPage(p); fetchSellers({ page: p }); }} className="px-3 py-2 border rounded disabled:opacity-50">Previous</button>
          <div className="text-sm">Page {page} of {totalPages}</div>
          <button disabled={page>=totalPages} onClick={() => { const p = Math.min(totalPages, page+1); setPage(p); fetchSellers({ page: p }); }} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
