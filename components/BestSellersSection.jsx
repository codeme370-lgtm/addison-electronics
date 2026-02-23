'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { ChevronRight, Flame } from 'lucide-react'

const BestSellersSection = () => {
    const products = useSelector(state => state.product.list)
    
    // Sort by some criteria (you can adjust based on your data)
    const bestSellers = [...products]
        .sort(() => Math.random() - 0.5) // Random for now, can be replaced with actual sales data
        .slice(0, 8)

    return (
        <div className='w-full bg-white py-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                        <Flame className='text-red-600 fill-red-600' size={28} />
                        <div>
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Best Sellers</h2>
                            <p className='text-orange-600 text-xs md:text-sm font-semibold'>Trending</p>
                        </div>
                    </div>
                    <Link href='/shop?sort=bestsellers' className='text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 text-sm md:text-base transition-colors'>
                        See All <ChevronRight size={18} />
                    </Link>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4'>
                    {bestSellers.map((product, idx) => (
                        <div key={product.id || idx} className='group relative'>
                            {/* Special badges */}
                            {idx === 0 && (
                                <div className='absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold z-20 shadow-md'>
                                    Hot
                                </div>
                            )}

                            {idx === 1 && (
                                <div className='absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold z-20 shadow-md'>
                                    Free Shipping
                                </div>
                            )}

                            <div className='relative'>
                                <ProductCard product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellersSection
