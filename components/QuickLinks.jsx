'use client'
import React from 'react'
import Link from 'next/link'
import { Zap, TrendingUp, Sparkles, Truck, Store } from 'lucide-react'

const QuickLinks = () => {
    const links = [
        {
            icon: Zap,
            label: 'Flash Deals',
            href: '/shop?sort=deals',
            bgColor: 'bg-red-100',
            iconColor: 'text-red-600'
        },
        {
            icon: TrendingUp,
            label: 'Top Sellers',
            href: '/shop?sort=trending',
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            icon: Sparkles,
            label: 'New Arrivals',
            href: '/shop?sort=new',
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
        },
        {
            icon: Truck,
            label: 'Wholesale',
            href: '/shop?wholesale=true',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            icon: Store,
            label: 'Local Shops',
            href: '/shop?local=true',
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
    ]

    return (
        <div className='w-full bg-white py-3 sm:py-4 px-2 sm:px-4 md:px-8 border-b border-gray-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-5 gap-1 sm:gap-2 md:gap-3'>
                    {links.map((link, idx) => {
                        const Icon = link.icon
                        return (
                            <Link key={idx} href={link.href}>
                                <div className={`${link.bgColor} p-2 sm:p-3 md:p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-all duration-200 h-full flex flex-col items-center justify-center transform hover:scale-105`}>
                                    <Icon className={`${link.iconColor} w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto mb-0.5 sm:mb-1`} />
                                    <span className='text-[9px] sm:text-xs md:text-sm font-semibold text-gray-700 text-center line-clamp-1 leading-tight'>{link.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuickLinks
