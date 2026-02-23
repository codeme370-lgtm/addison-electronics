'use client'
import React from 'react'
import Link from 'next/link'

const MegaSaleBanner = () => {
    return (
        <div className='w-full'>
            {/* Two-column banner layout */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full'>
                {/* Mega Sale Banner - Left (takes up 2/3 on desktop) */}
                <div className='relative col-span-1 md:col-span-2 bg-gradient-to-r from-red-600 via-red-500 to-orange-600 rounded-xl overflow-hidden shadow-lg h-40 md:h-56 flex items-center'>
                    {/* Background pattern */}
                    <div className='absolute inset-0 opacity-20'>
                        <div className='absolute top-0 right-0 w-80 h-80 bg-yellow-300 rounded-full blur-3xl'></div>
                        <div className='absolute bottom-0 left-0 w-60 h-60 bg-orange-400 rounded-full blur-2xl'></div>
                    </div>

                    <div className='relative z-10 px-6 md:px-8 py-4 flex flex-col justify-center h-full'>
                        <h2 className='text-2xl md:text-4xl font-bold text-white mb-1'>Mega Sale</h2>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-white font-semibold'>UP TO</span>
                            <span className='text-3xl md:text-5xl font-bold text-yellow-300'>70%</span>
                            <span className='text-white font-semibold'>OFF</span>
                        </div>
                        <p className='text-xs md:text-sm text-white mb-4 opacity-95'>
                            • Free Shipping | Top Brands
                        </p>
                        <Link href='/shop?section=mega-sale' className='inline-block bg-white hover:bg-gray-100 text-red-600 font-bold px-6 py-2 rounded-lg transition-all duration-200 text-sm md:text-base w-fit shadow-md hover:shadow-lg'>
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Daily Deals Banner - Right (takes up 1/3 on desktop) */}
                <div className='relative col-span-1 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl overflow-hidden shadow-lg h-48 md:h-56 flex flex-col items-start justify-center px-6 md:px-8 py-4 border-2 border-orange-100'>
                    {/* Background decoration */}
                    <div className='absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-40'></div>

                    <div className='relative z-10'>
                        <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>Daily<br/><span className='text-red-600'>Deals</span></h3>
                        
                        <div className='flex items-center gap-2 mb-4'>
                            <span className='inline-block bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-md'>40% OFF</span>
                            <span className='text-sm md:text-base text-gray-700 font-semibold'>Limited Time</span>
                        </div>
                        
                        <Link href='/shop?section=daily-deals' className='inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 md:px-5 py-2 rounded-lg transition-all duration-200 text-xs md:text-sm shadow-md hover:shadow-lg'>
                            Buy Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MegaSaleBanner
