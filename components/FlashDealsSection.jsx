'use client'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const FlashDealsSection = () => {
    const products = useSelector(state => state.product.list)
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 22 })
    const [scrollPos, setScrollPos] = useState(0)

    // Countdown timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev
                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    minutes--
                    seconds = 59
                } else if (hours > 0) {
                    hours--
                    minutes = 59
                    seconds = 59
                }
                return { hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const scrollContainers = (direction) => {
        const container = document.getElementById('flash-deals-scroll')
        if (container) {
            const scrollAmount = 300
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }

    const flashProducts = products.slice(0, 8)

    return (
        <div className='w-full bg-white py-6 sm:py-8 px-2 sm:px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6'>
                    <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
                        <div className='bg-red-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded font-bold text-xs sm:text-base shadow-md'>
                            Flash Sale
                        </div>
                        <div className='flex items-center gap-1.5 sm:gap-2 bg-gray-900 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded font-mono text-[10px] sm:text-xs md:text-sm shadow-md'>
                            <span className='hidden sm:inline'>Ending in:</span>
                            <span className='font-bold'>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span>:</span>
                            <span className='font-bold'>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span>:</span>
                            <span className='font-bold'>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        </div>
                    </div>
                    <Link href='/shop?section=flash' className='text-red-600 hover:text-red-700 font-semibold text-xs sm:text-base transition-colors'>
                        View All →
                    </Link>
                </div>

                {/* Grid layout for flash deals - responsive */}
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
                    {flashProducts.map((product, idx) => (
                        <div key={product.id || idx} className='group relative'>
                            {/* Discount badge */}
                            {product.mrp && product.price && (
                                <div className='absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-bold z-10 shadow-md'>
                                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                </div>
                            )}
                            
                            {/* Sold count badge (if available) */}
                            {product.sold && (
                                <div className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-gray-800 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded z-10 opacity-80'>
                                    {product.sold > 1000 ? (product.sold / 1000).toFixed(1) : product.sold}k sold
                                </div>
                            )}
                            
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FlashDealsSection
