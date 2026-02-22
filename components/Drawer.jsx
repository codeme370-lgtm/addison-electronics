"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingCart, Box, Tag, Home, User, Briefcase, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'
import logo from '@/app/logo.jpg'

const Drawer = ({ open, onClose }) => {
    const cartCount = useSelector(state => state.cart.total)

    return (
        <>
            {/* Overlay */}
            <div className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose} style={{ zIndex: 40 }} />

            {/* Drawer panel (left side) */}
            <aside className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-blue-100/75 shadow-2xl transform transition-transform duration-300 backdrop-blur-sm ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!open} style={{ zIndex: 50 }}>
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow">
                                <Image src={logo} alt="jeescage" width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-blue-900">jees<span className="text-blue-600">cage</span></div>
                                <div className="text-xs text-blue-700">Shop smarter</div>
                            </div>
                        </div>
                        <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-md hover:bg-blue-200/80 text-blue-900">
                            <X />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-auto">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Home /> <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Box /> <span>Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <ShoppingCart /> <span>Cart</span>
                                    {cartCount > 0 && <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Briefcase /> <span>Orders</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/coupons" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Tag /> <span>Coupons</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/stores" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Briefcase /> <span>Stores</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <User /> <span>Account</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-200/60 text-blue-900 font-medium transition">
                                    <Phone /> <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="mt-4">
                        <Link href="/shop" className="block w-full text-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-md font-semibold">Browse Products</Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Drawer
