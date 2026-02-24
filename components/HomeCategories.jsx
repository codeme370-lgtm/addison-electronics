"use client"
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'

const HomeCategories = () => {

    const displayPerCategory = 6
    const products = useSelector(state => state.product.list)
    const categories = useSelector(state => state.category.list)

    return (
        <div className='px-4 md:px-6 my-12 max-w-7xl mx-auto'>
            {categories.map((cat, idx) => {
                const categoryName = cat.name || cat
                const items = products.filter(p => p.category === categoryName)
                if (!items || items.length === 0) return null
                const sorted = items.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

                return (
                    <section key={idx} className='mb-10'>
                        <div className='flex items-end justify-between mb-4'>
                            <div>
                                <h3 className='text-2xl font-semibold text-slate-900'>{categoryName}</h3>
                                <p className='text-sm text-slate-600 mt-1'>Showing {items.length < displayPerCategory ? items.length : displayPerCategory} of {items.length} products</p>
                            </div>
                            <a href={`/shop?category=${encodeURIComponent(categoryName)}`} className='text-sm text-green-600 hover:underline flex items-center gap-2'>
                                See all <ArrowRight size={14} />
                            </a>
                        </div>

                        <div className='-mx-4 sm:mx-0 overflow-x-auto no-scrollbar'>
                            <div className='flex gap-4 px-4 sm:px-0'>
                                {sorted.slice(0, displayPerCategory).map((product, i) => (
                                    <div key={product.id || i} className='min-w-[160px] sm:min-w-[190px] md:min-w-[220px] flex-shrink-0'>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default HomeCategories
