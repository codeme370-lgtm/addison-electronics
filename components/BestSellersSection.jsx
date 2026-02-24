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
        <div className='w-full bg-white py-6 sm:py-8 px-2 sm:px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <Flame className='text-red-600 fill-red-600 w-6 h-6 sm:w-7 sm:h-7' size={28} />
                        <div>
                            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>Best Sellers</h2>
                            <p className='text-orange-600 text-[10px] sm:text-xs md:text-sm font-semibold'>Trending</p>
                        </div>
                    </div>
                    <Link href='/shop?sort=bestsellers' className='text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 text-xs sm:text-base transition-colors whitespace-nowrap'>
                        See All <ChevronRight size={16} className='sm:w-4 sm:h-4' />
                    </Link>
                </div>

                <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
                    {bestSellers.map((product, idx) => (
                        <div key={product.id || idx} className='group relative'>
                            {/* Special badges */}
                            {idx === 0 && (
                                <div className='absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-600 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-bold z-20 shadow-md'>
                                    Hot
                                </div>
                            )}

                            {idx === 1 && (
                                <div className='absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-bold z-20 shadow-md'>
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
