'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const FrequentlySearched = () => {
    const products = useSelector(state => state.product.list)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    // Get top products by rating for fast dispatch carousel
    const topProducts = products
        .slice()
        .sort((a, b) => b.rating.length - a.rating.length)
        .slice(0, 5)

    // Get unique categories from products
    const uniqueCategories = [...new Set(products.map(p => p.category))].filter(Boolean).slice(0, 8)

    // Get 2 random products from any category
    const randomProducts = products
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)

    // Auto-play carousel
    useEffect(() => {
        if (!autoPlay) return
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.max(topProducts.length, 1))
        }, 5000)
        return () => clearInterval(timer)
    }, [autoPlay, topProducts.length])

    const handleNext = () => {
        setCurrentSlide(prev => (prev + 1) % Math.max(topProducts.length, 1))
        setAutoPlay(false)
    }

    const handlePrev = () => {
        setCurrentSlide(prev => (prev - 1 + Math.max(topProducts.length, 1)) % Math.max(topProducts.length, 1))
        setAutoPlay(false)
    }

    if (randomProducts.length === 0 && topProducts.length === 0) return null

    return (
        <div className='pl-4 pr-4 my-8 max-w-7xl mx-auto'>
            {/* Main Layout: Sidebar + Content */}
            <div className='flex gap-6'>
                {/* Left Sidebar - Categories */}
                <div className='hidden lg:block w-48 flex-shrink-0'>
                    <div className='bg-white rounded-lg border border-slate-200 overflow-hidden sticky top-20'>
                        <div className='bg-slate-900 text-white px-4 py-3 font-bold'>
                            Categories
                        </div>
                        <nav className='divide-y'>
                            {uniqueCategories.map((category, idx) => (
                                <Link
                                    key={idx}
                                    href={`/category/${encodeURIComponent(category)}`}
                                    className='block px-4 py-3 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-colors text-sm font-medium'
                                >
                                    {category}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Center + Right Content */}
                <div className='flex-1 flex gap-6'>
                    {/* Frequently Searched Sections */}
                    <div className='flex-1 space-y-6'>
                        {randomProducts.length > 0 && (
                            <div className='bg-white rounded-lg p-6 border border-slate-200'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='h-6 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-full'></div>
                                    <h3 className='text-lg font-bold text-slate-900'>
                                        Frequently searched
                                    </h3>
                                </div>
                                <div className='grid grid-cols-2 gap-8'>
                                    {randomProducts.map((product, pidx) => (
                                        <Link
                                            key={pidx}
                                            href={`/product/${product.id}`}
                                            className='flex flex-col items-center group hover:shadow-md rounded-lg p-2 transition-all'
                                        >
                                            <div className='w-full h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:bg-slate-200'>
                                                {product.images && product.images[0] ? (
                                                    <img 
                                                        src={product.images[0]} 
                                                        alt={product.name}
                                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                                                    />
                                                ) : (
                                                    <div className='w-full h-full bg-gradient-to-br from-slate-300 to-slate-400' />
                                                )}
                                            </div>
                                            <p className='text-sm font-medium text-slate-700 text-center line-clamp-2 w-full hover:text-red-600'>
                                                {product.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fast Dispatch Carousel - Right Side */}
                    {topProducts.length > 0 && (
                        <div className='hidden lg:block lg:w-80 flex-shrink-0'>
                            <div className='bg-gradient-to-br from-pink-400 via-pink-300 to-purple-300 rounded-lg p-6 min-h-full flex flex-col justify-between relative overflow-hidden sticky top-20'>
                                {/* Background pattern */}
                                <div className='absolute inset-0 opacity-10'>
                                    <div className='absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-screen'></div>
                                    <div className='absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-screen'></div>
                                </div>

                                <div className='relative z-10'>
                                    <h3 className='text-2xl font-bold text-white mb-1'>Fast dispatch</h3>
                                    <p className='text-white text-sm font-medium mb-6'>selection</p>

                                    {/* Carousel */}
                                    <div className='bg-white rounded-lg p-3 h-44 flex items-center justify-center mb-4 relative'>
                                        {topProducts[currentSlide] && (
                                            <div className='w-full h-full flex items-center justify-center'>
                                                {topProducts[currentSlide].images && topProducts[currentSlide].images[0] ? (
                                                    <img 
                                                        src={topProducts[currentSlide].images[0]} 
                                                        alt={topProducts[currentSlide].name}
                                                        className='w-full h-full object-cover rounded'
                                                    />
                                                ) : (
                                                    <div className='w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded' />
                                                )}
                                            </div>
                                        )}

                                        {/* Nav Arrows */}
                                        <button
                                            onClick={handlePrev}
                                            className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full z-20'
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full z-20'
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>

                                    {/* Carousel Dots */}
                                    <div className='flex justify-center gap-2 mb-4'>
                                        {topProducts.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setCurrentSlide(idx)
                                                    setAutoPlay(false)
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentSlide
                                                        ? 'bg-white w-6'
                                                        : 'bg-white/60 hover:bg-white/80'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Product Name */}
                                    <p className='text-white text-sm font-semibold mb-4 text-center line-clamp-2'>
                                        {topProducts[currentSlide]?.name}
                                    </p>

                                    {/* View More Button */}
                                    <Link href='/shop' className='w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-full transition-colors text-center block'>
                                        View more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FrequentlySearched

