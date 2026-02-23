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
        <div className='w-full bg-white py-12 px-4 md:px-8 border-t border-b border-gray-200'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900'>
                    Why Shop With Us?
                </h2>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <div key={idx} className={`${feature.bgColor} p-6 md:p-8 rounded-lg text-center hover:shadow-md transition-all duration-200 border border-gray-100`}>
                                <div className='flex justify-center mb-4'>
                                    <Icon className={`${feature.color} w-14 h-14 md:w-16 md:h-16`} />
                                </div>
                                <h3 className='text-base md:text-lg font-semibold text-gray-900 mb-2'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600 text-xs md:text-sm'>
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
