"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingCart, Zap, Flame, TrendingUp, Sparkles, UtensilsCrossed, Heart, Smartphone, Shirt, Home, Dumbbell, ShoppingBag, Baby, Car, BookOpen, Grid, ChevronLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import logo from '@/app/logo.jpg'

const Drawer = ({ open, onClose, isSidebarMode = false, isSidebarOpen = true, onSidebarToggle = () => {} }) => {
    const cartCount = useSelector(state => state.cart.total)

    const categories = [
        { name: 'Electronics', icon: Smartphone, href: '/shop?category=Electronics' },
        { name: 'Fashion', icon: Shirt, href: '/shop?category=Fashion' },
        { name: 'Home & Kitchen', icon: Home, href: '/shop?category=Home' },
        { name: 'Beauty & Health', icon: Heart, href: '/shop?category=Beauty' },
        { name: 'Mobiles & Tablets', icon: Smartphone, href: '/shop?category=Mobiles' },
        { name: 'Sports & Outdoors', icon: Dumbbell, href: '/shop?category=Sports' },
        { name: 'Groceries', icon: ShoppingBag, href: '/shop?category=Groceries' },
        { name: 'Baby & Toys', icon: Baby, href: '/shop?category=Baby' },
        { name: 'Automotive', icon: Car, href: '/shop?category=Automotive' },
        { name: 'Books & More', icon: BookOpen, href: '/shop?category=Books' },
    ]

    const quickLinks = [
        { name: 'Browse All Categories', icon: Grid, href: '/category' },
        { name: 'Super Deals', icon: Zap, href: '/shop?sort=deals' },
        { name: 'Flash Sale', icon: Flame, href: '/shop?section=flash' },
        { name: 'Best Sellers', icon: TrendingUp, href: '/shop?sort=bestsellers' },
        { name: 'New Arrivals', icon: Sparkles, href: '/shop?sort=new' },
    ]

    return (
        <>
            {/* Mobile Drawer Mode */}
            {!isSidebarMode && (
                <>
                    {/* Overlay */}
                    <div className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose} style={{ zIndex: 40 }} />

                    {/* Drawer panel (left side) */}
                    <aside className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!open} style={{ zIndex: 50 }}>
                        <DrawerContent onClose={onClose} categories={categories} quickLinks={quickLinks} />
                    </aside>
                </>
            )}

            {/* Sidebar Mode (Medium+ screens) */}
            {isSidebarMode && (
                <>
                    {/* Sidebar Header (Top Logo) */}
                    <div className={`hidden md:flex fixed left-0 top-0 h-20 bg-white border-b border-gray-200 flex items-center transition-all duration-300 z-50 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
                        <div className={`flex items-center gap-3 p-4 w-full ${isSidebarOpen ? '' : 'justify-center'}`}>
                            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 shadow flex-shrink-0`}>
                                <Image src={logo} alt="jeescage" width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            {isSidebarOpen && (
                                <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                    <span className="text-red-600">jees</span><span className="text-orange-600">cage</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className={`hidden md:flex fixed left-0 top-20 h-[calc(100vh-80px)] bg-white border-r border-gray-200 transition-all duration-300 flex-col ${isSidebarOpen ? 'w-80' : 'w-20'}`} style={{ zIndex: 40 }}>
                        {/* Minimize button */}
                        <button
                            onClick={onSidebarToggle}
                            className={`absolute p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-700 top-6 right-2 z-50`}
                            aria-label="Toggle sidebar"
                        >
                            <ChevronLeft size={20} className={`transform transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSidebarOpen ? (
                            <DrawerContent onClose={() => {}} categories={categories} quickLinks={quickLinks} isSidebar={true} />
                        ) : (
                            /* Collapsed sidebar icons */
                            <div className="w-full p-4 overflow-y-auto flex flex-col items-center gap-4">
                                {/* Category icons */}
                                {categories.map((category, idx) => {
                                    const Icon = category.icon
                                    return (
                                        <Link key={idx} href={category.href} title={category.name} className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-700">
                                            <Icon size={20} />
                                        </Link>
                                    )
                                })}
                                <div className="w-full h-px bg-gray-200 my-2" />
                                {/* Quick links icons */}
                                {quickLinks.map((link, idx) => {
                                    const Icon = link.icon
                                    return (
                                        <Link key={idx} href={link.href} title={link.name} className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-700">
                                            <Icon size={20} />
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </aside>

                    {/* Overlay for mobile drawer when open */}
                    {open && (
                        <div className={`fixed inset-0 bg-black/40 transition-opacity md:hidden`} onClick={onClose} style={{ zIndex: 40 }} />
                    )}
                </>
            )}
        </>
    )
}

function DrawerContent({ onClose, categories, quickLinks, isSidebar = false }) {
    return (
        <div className={`p-4 h-full flex flex-col overflow-y-auto ${isSidebar ? 'pt-6' : ''}`}>
            {/* Header with logo and close button */}
            {!isSidebar && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 shadow">
                            <Image src={logo} alt="jeescage" width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900">jees<span className="text-red-600">cage</span></div>
                            <div className="text-xs text-gray-600">Shop Smarter</div>
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-md hover:bg-gray-100 text-gray-700">
                        <X size={24} />
                    </button>
                </div>
            )}

            {/* Categories Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3 px-2">
                    <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                    {!isSidebar && (
                        <Link href="/category" onClick={onClose} className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition">
                            View All
                        </Link>
                    )}
                </div>
                <nav className="space-y-2">
                    {categories.map((category, idx) => {
                        const Icon = category.icon
                        return (
                            <Link key={idx} href={category.href} onClick={onClose}>
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition text-gray-800 font-medium">
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} className="text-gray-700" />
                                        <span>{category.name}</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Quick Links Section */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Quick Links</h3>
                <nav className="space-y-2">
                    {quickLinks.map((link, idx) => {
                        const Icon = link.icon
                        return (
                            <Link key={idx} href={link.href} onClick={onClose}>
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition text-gray-800 font-medium">
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} className="text-gray-700" />
                                        <span>{link.name}</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Become a Seller Button */}
            <Link href="/create-store" onClick={onClose} className="block w-full">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-bold text-center transition-all duration-200 shadow-md hover:shadow-lg">
                    Become a Seller
                </button>
            </Link>
        </div>
    )
}

export default Drawer