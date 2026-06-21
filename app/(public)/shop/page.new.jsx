'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Heart, LayoutGrid, List, ShoppingCart, Star, ChevronDown, X } from 'lucide-react'

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS'

const products = [
  {
    id: 'tn-001',
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptops & Computers',
    brand: 'ASUS',
    price: 1499,
    oldPrice: 1799,
    rating: 4.8,
    reviews: 320,
    availability: 'In Stock',
    badge: 'New',
    videoGuide: true,
    degree: '360°',
    highlight: 'RTX 4060 • 14" QHD+ • 16GB RAM',
  },
  {
    id: 'tn-002',
    name: 'Apple MacBook Air M3',
    category: 'Laptops & Computers',
    brand: 'Apple',
    price: 1099,
    oldPrice: 1199,
    rating: 4.9,
    reviews: 215,
    availability: 'In Stock',
    badge: '-10%',
    videoGuide: true,
    degree: '360°',
    highlight: 'M3 • 13.6" Liquid Retina • 8GB RAM',
  },
  {
    id: 'tn-003',
    name: 'Dell XPS 15',
    category: 'Laptops & Computers',
    brand: 'Dell',
    price: 1899,
    oldPrice: 2399,
    rating: 4.7,
    reviews: 189,
    availability: 'In Stock',
    badge: '-20%',
    videoGuide: true,
    degree: '360°',
    highlight: 'i7-13700H • 16GB RAM • 1TB SSD',
  },
  {
    id: 'tn-004',
    name: 'Lenovo Legion Pro 5i',
    category: 'Laptops & Computers',
    brand: 'Lenovo',
    price: 1599,
    oldPrice: 0,
    rating: 4.6,
    reviews: 142,
    availability: 'In Stock',
    badge: 'New',
    videoGuide: true,
    degree: '360°',
    highlight: 'RTX 4070 • 16GB RAM • 1TB SSD',
  },
  {
    id: 'tn-005',
    name: 'ASUS ROG Strix G16',
    category: 'Laptops & Computers',
    brand: 'ASUS',
    price: 1749,
    oldPrice: 2299,
    rating: 4.8,
    reviews: 256,
    availability: 'In Stock',
    badge: '-15%',
    videoGuide: true,
    degree: '360°',
    highlight: 'i9-13900HX • 16GB RAM • RTX 4070',
  },
  {
    id: 'tn-006',
    name: 'Dell G15 Gaming',
    category: 'Laptops & Computers',
    brand: 'Dell',
    price: 899,
    oldPrice: 1099,
    rating: 4.5,
    reviews: 178,
    availability: 'In Stock',
    badge: '-18%',
    videoGuide: true,
    degree: '360°',
    highlight: 'RTX 4060 • 15.6" FHD • 16GB RAM',
  },
  {
    id: 'tn-007',
    name: 'Apple Mac Mini M2',
    category: 'Laptops & Computers',
    brand: 'Apple',
    price: 599,
    oldPrice: 0,
    rating: 4.9,
    reviews: 98,
    availability: 'In Stock',
    badge: 'New',
    videoGuide: false,
    degree: '',
    highlight: 'M2 Chip • 8GB RAM • 256GB SSD',
  },
  {
    id: 'tn-008',
    name: 'HP Spectre x360 14',
    category: 'Laptops & Computers',
    brand: 'HP',
    price: 1149,
    oldPrice: 1299,
    rating: 4.6,
    reviews: 122,
    availability: 'In Stock',
    badge: '-12%',
    videoGuide: false,
    degree: '360°',
    highlight: 'OLED Touch • 16GB RAM • 1TB SSD',
  },
]

const categories = ['Laptops & Computers', 'Gaming', 'Accessories', 'Monitors', 'Components', 'Networking']
const brands = ['Apple', 'ASUS', 'Dell', 'Lenovo', 'HP']
const ratings = ['4 Stars & up', '3 Stars & up', '2 Stars & up']
const availabilities = ['In Stock', 'Out of Stock']
const topCategories = ['Laptops & Computers', 'Gaming', 'Monitors', 'Accessories', 'Components']

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Laptops & Computers')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [selectedRating, setSelectedRating] = useState('All Ratings')
  const [priceRange, setPriceRange] = useState(3500)
  const [viewMode, setViewMode] = useState('grid')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand
      const matchesRating = selectedRating === 'All Ratings' ||
        (selectedRating === '4 Stars & up' && product.rating >= 4) ||
        (selectedRating === '3 Stars & up' && product.rating >= 3) ||
        (selectedRating === '2 Stars & up' && product.rating >= 2)
      const matchesPrice = product.price <= priceRange
      return matchesSearch && matchesCategory && matchesBrand && matchesRating && matchesPrice
    })
  }, [searchTerm, selectedCategory, selectedBrand, selectedRating, priceRange])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.95)] transition duration-500 hover:-translate-y-0.5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Home / Shop / Laptops & Computers</p>
              <h1 className="text-4xl font-semibold text-white">Laptops & Computers</h1>
              <p className="max-w-2xl text-sm text-slate-400">Explore high-performance laptops and computers for gaming, business, creativity, and everyday use.</p>
            </div>
            <div className="hidden xl:flex items-center gap-3 rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-300">
              <span className="rounded-full bg-violet-500/15 px-3 py-2 text-violet-300">Up to 30% OFF</span>
              <div className="grid gap-1 text-right">
                <p className="text-sm text-slate-400">Limited time offer</p>
                <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                  Shop Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <button onClick={() => { setSelectedCategory('All Categories'); setSelectedBrand('All Brands'); setSelectedRating('All Ratings'); setPriceRange(3500) }} className="text-sm text-violet-300 hover:text-violet-200">Clear All</button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Category</p>
                  <div className="mt-3 grid gap-2">
                    {['All Categories', ...categories].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${selectedCategory === category ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-violet-500 hover:bg-slate-900'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Brand</p>
                  <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                    <option>All Brands</option>
                    {brands.map((brand) => <option key={brand}>{brand}</option>)}
                  </select>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Price Range</p>
                  <div className="mt-3 space-y-3 rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{`${currency}${Math.max(100, priceRange - 200)}`}</span>
                      <span>{`${currency}${priceRange}`}</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={5000}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-violet-500/30 accent-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Rating</p>
                  <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
                    <option>All Ratings</option>
                    {ratings.map((rating) => <option key={rating}>{rating}</option>)}
                  </select>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Availability</p>
                  <div className="mt-3 space-y-2">
                    {availabilities.map((value) => (
                      <label key={value} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300">
                        <input
                          type="radio"
                          name="availability"
                          value={value}
                          checked={selectedRating === value}
                          onChange={() => setSelectedRating(value)}
                          className="h-4 w-4 accent-violet-500"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)]">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Showing {filteredProducts.length} products</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Shop by Category</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={() => setViewMode('grid')} className={`inline-flex items-center gap-2 rounded-3xl px-4 py-3 text-sm transition ${viewMode === 'grid' ? 'bg-violet-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}>
                    <LayoutGrid size={16} /> Grid
                  </button>
                  <button onClick={() => setViewMode('list')} className={`inline-flex items-center gap-2 rounded-3xl px-4 py-3 text-sm transition ${viewMode === 'list' ? 'bg-violet-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}>
                    <List size={16} /> List
                  </button>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <article key={product.id} className="group overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:border-violet-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">{product.badge}</span>
                        {product.videoGuide && <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Video Guide</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                      <p className="text-sm text-slate-400">{product.highlight}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-400">{product.degree}</div>
                  </div>

                  <div className="relative mt-5 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5">
                    <div className="aspect-[4/3] rounded-[24px] bg-slate-800" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_30%)]" />
                    <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4 text-sm text-slate-300">
                      <span>{product.brand}</span>
                      <span>Live 360°</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-white">{`${currency}${product.price.toLocaleString()}`}</p>
                      {product.oldPrice > 0 && <p className="text-sm text-slate-500 line-through">{`${currency}${product.oldPrice.toLocaleString()}`}</p>}
                    </div>
                    <div className="rounded-3xl bg-slate-900 px-4 py-2 text-xs text-slate-300">{product.availability}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-slate-400">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} size={14} className={index < Math.round(product.rating) ? 'text-amber-400' : 'text-slate-600'} />
                      ))}
                    </div>
                    <span className="text-sm">{product.rating} ({product.reviews})</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:text-white">
                      <Heart size={16} /> Wishlist
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Compare Products</p>
                  <p className="mt-2 text-sm text-slate-400">Selected items for fast comparison.</p>
                </div>
                <button className="text-sm text-violet-300 hover:text-violet-200">Clear</button>
              </div>
              <div className="mt-6 space-y-4">
                {[ 'ASUS ROG Zephyrus G14', 'Dell XPS 15' ].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{item}</p>
                        <p className="text-sm text-slate-500">{item.includes('ASUS') ? `${currency}1,499.00` : `${currency}1,899.00`}</p>
                      </div>
                      <button className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-400 hover:border-rose-500 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">Compare Now</button>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Shop with Confidence</p>
                  <p className="mt-2 text-sm text-slate-400">Trusted perks for every purchase.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Free Worldwide Shipping', detail: `On orders over ${currency}99` },
                  { label: '30-Day Easy Returns', detail: 'No questions asked' },
                  { label: '2 Years Warranty', detail: 'On all eligible products' },
                  { label: 'Secure Checkout', detail: '100% secure payment' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">✓</span>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Top Categories</p>
                <button className="text-sm text-violet-300 hover:text-violet-200">View All</button>
              </div>
              <div className="mt-6 space-y-3">
                {topCategories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 hover:border-violet-500 hover:text-white transition">
                    <span>{cat}</span>
                    <ChevronDown size={16} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
