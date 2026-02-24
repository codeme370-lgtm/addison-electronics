'use client'
import React from 'react'
import { Shield, Truck, RotateCcw, Users } from 'lucide-react'

const WhyShopWithUsSection = () => {
    const features = [
        {
            icon: Shield,
            title: 'Secure Payments',
            description: 'Multiple secure payment options',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Quick and reliable shipping',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            icon: RotateCcw,
            title: 'Easy Returns',
            description: 'Hassle-free return policy',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: Users,
            title: 'Buyer Protection',
            description: '24/7 customer support',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ]

    return (
        <div className='w-full bg-white py-8 sm:py-10 md:py-12 px-2 sm:px-4 md:px-8 border-t border-b border-gray-200'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-lg sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900'>
                    Why Shop With Us?
                </h2>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6'>
                    {features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <div key={idx} className={`${feature.bgColor} p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg text-center hover:shadow-md transition-all duration-200 border border-gray-100`}>
                                <div className='flex justify-center mb-2 sm:mb-3 md:mb-4'>
                                    <Icon className={`${feature.color} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16`} />
                                </div>
                                <h3 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600 text-[10px] sm:text-xs md:text-sm leading-tight'>
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default WhyShopWithUsSection
