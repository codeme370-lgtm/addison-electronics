'use client'
import React from 'react'
import { Download, Apple, PlayCircle, Gift } from 'lucide-react'

const AppPromotionSection = () => {
    return (
        <div className='w-full bg-gradient-to-r from-red-600 to-orange-600 py-10 px-4 md:px-8 text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'>
                    {/* Left side - App promotion */}
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <Gift size={24} className='text-yellow-300' />
                            <span className='text-yellow-300 font-semibold text-sm md:text-base'>App Exclusive!</span>
                        </div>
                        <h2 className='text-2xl md:text-3xl font-bold mb-2'>
                            App Exclusive Discounts!
                        </h2>
                        <p className='text-gray-100 mb-6 text-sm md:text-base'>
                            Save More with Our Mobile App. Get exclusive deals and faster checkout!
                        </p>
                        <div className='flex gap-3 flex-wrap'>
                            <button className='flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-lg transition-all duration-200 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl'>
                                <Apple size={20} />
                                <span className='hidden sm:inline'>App Store</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-lg transition-all duration-200 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl'>
                                <PlayCircle size={20} />
                                <span className='hidden sm:inline'>Google Play</span>
                            </button>
                        </div>
                    </div>

                    {/* Right side - Download icon */}
                    <div className='hidden md:flex justify-center md:justify-end'>
                        <div className='bg-white/15 p-8 rounded-lg backdrop-blur-sm border border-white/20'>
                            <Download className='text-yellow-300' size={64} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppPromotionSection
