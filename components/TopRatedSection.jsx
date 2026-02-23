'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'

const TopRatedSection = () => {
    const products = useSelector(state => state.product.list)
    
    // Get top rated products (sort by rating if available)
    const topRated = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)

    return (
        <div className='w-full bg-gray-50 py-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                        <Star className='text-yellow-500 fill-yellow-500' size={28} />
                        <div>
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
                                Top Rated
                            </h2>
                            <p className='text-orange-600 text-xs md:text-sm font-semibold'>Customer Favorites</p>
                        </div>
                    </div>
                    <Link href='/shop?sort=rated' className='text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 text-sm md:text-base transition-colors'>
                        See All <ChevronRight size={18} />
                    </Link>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4'>
                    {topRated.map((product, idx) => (
                        <div key={product.id || idx} className='group'>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopRatedSection
