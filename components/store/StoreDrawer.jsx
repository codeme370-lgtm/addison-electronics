'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Home, SquarePlus, SquarePen, LayoutList, ShoppingBag } from 'lucide-react'

const StoreDrawer = ({ open, onClose, storeInfo }) => {
    const drawerLinks = [
        { name: 'Dashboard', href: '/store', icon: Home },
        { name: 'Add Product', href: '/store/add-product', icon: SquarePlus },
        { name: 'Manage Product', href: '/store/manage-product', icon: SquarePen },
        { name: 'Orders', href: '/store/orders', icon: LayoutList },
        { name: 'Back to Shop', href: '/shop', icon: ShoppingBag },
    ]

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
                onClick={onClose} 
                style={{ zIndex: 40 }} 
            />

            {/* Drawer panel (left side) */}
            <aside 
                className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`} 
                aria-hidden={!open} 
                style={{ zIndex: 50 }}
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-600 shadow">
                                <Image 
                                    src={storeInfo?.logo || '/favicon.ico'} 
                                    alt={storeInfo?.name || 'Store'} 
                                    width={48} 
                                    height={48} 
                                    className="object-cover w-full h-full" 
                                />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-800">{storeInfo?.name || 'Store'}</div>
                                <div className="text-xs text-slate-500">Store Dashboard</div>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            aria-label="Close menu" 
                            className="p-2 rounded-md hover:bg-slate-100"
                        >
                            <X />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-auto">
                        <ul className="space-y-2">
                            {drawerLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        href={link.href} 
                                        className="flex items-center gap-3 p-3 rounded-md hover:bg-green-50 transition"
                                        onClick={onClose}
                                    >
                                        <link.icon size={20} /> 
                                        <span className="font-medium">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-4 space-y-2">
                        <Link 
                            href="/" 
                            className="block w-full text-center px-4 py-2 bg-slate-100 text-slate-700 rounded-md font-semibold hover:bg-slate-200 transition"
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default StoreDrawer
