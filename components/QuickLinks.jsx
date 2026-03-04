'use client'
import React from 'react'
import Link from 'next/link'

const QuickLinks = () => {
    const links = [
        {
            label: 'Flash Deals',
            href: '/shop?sort=deals',
            bgColor: 'bg-gradient-to-br from-red-500 to-red-600'
        },
        {
            label: 'Top Sellers',
            href: '/seller',
            bgColor: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
        },
        {
            label: 'New Arrivals',
            href: '/shop?sort=new',
            bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
        },
        {
            label: 'Wholesale',
            href: '/shop?wholesale=true',
            bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600'
        },
        {
            label: 'Local Shops',
            href: '/shop?local=true',
            bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
        },
    ]

    return (
        <div className='w-full bg-white py-2 sm:py-3 px-2 sm:px-4 md:px-8 border-b border-gray-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-5 gap-1 sm:gap-2 md:gap-3'>
                    {links.map((link, idx) => {
                        return (
                            <Link key={idx} href={link.href}>
                                <div className={`${link.bgColor} p-1.5 sm:p-2 md:p-3 rounded-lg text-center cursor-pointer hover:shadow-lg transition-all duration-200 h-full flex flex-col items-center justify-center transform hover:scale-105`}>
                                    <span className='text-[9px] sm:text-xs md:text-sm font-bold text-white text-center line-clamp-2 leading-tight'>{link.label}</span>
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
