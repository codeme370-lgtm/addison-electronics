'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    X,
    Home,
    Box,
    ShoppingBag,
    Store,
    ShieldCheck,
    Ticket,
    Layers,
    Tag,
    SlidersHorizontal,
    Star,
    Users,
    RefreshCcw,
    Image as ImageIcon,
    Mail,
    FileText,
    Edit3,
    UserCheck,
    Key,
    CreditCard,
    Truck,
    Percent,
    Settings,
    Activity,
    ServerCog,
} from 'lucide-react'

const AdminDrawer = ({ open, onClose, userImage, userName }) => {
    const sections = [
        {
            title: null,
            links: [
                { name: 'Dashboard', href: '/admin', icon: Home },
            ]
        },
        {
            title: 'STORE MANAGEMENT',
            links: [
                { name: 'Products', href: '/admin/products', icon: Box },
                { name: 'Categories', href: '/admin/categories', icon: Layers },
                { name: 'Brands', href: '/admin/brands', icon: Tag },
                { name: 'Attributes', href: '/admin/attributes', icon: SlidersHorizontal },
                { name: 'Reviews', href: '/admin/reviews', icon: Star },
            ]
        },
        {
            title: 'ORDERS & CUSTOMERS',
            links: [
                { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
                { name: 'Customers', href: '/admin/customers', icon: Users },
                { name: 'Returns & Refunds', href: '/admin/returns', icon: RefreshCcw },
            ]
        },
        {
            title: 'MARKETING & CONTENT',
            links: [
                { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
                { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
                { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
                { name: 'Pages', href: '/admin/pages', icon: FileText },
                { name: 'Blog Posts', href: '/admin/blog-posts', icon: Edit3 },
            ]
        },
        {
            title: 'SYSTEM & SETTINGS',
            links: [
                { name: 'Users & Roles', href: '/admin/users', icon: UserCheck },
                { name: 'Permissions', href: '/admin/permissions', icon: Key },
                { name: 'Payment Methods', href: '/admin/payment-methods', icon: CreditCard },
                { name: 'Shipping Methods', href: '/admin/shipping-methods', icon: Truck },
                { name: 'Taxes', href: '/admin/taxes', icon: Percent },
                { name: 'Settings', href: '/admin/settings', icon: Settings },
                { name: 'Activity Logs', href: '/admin/activity-logs', icon: Activity },
                { name: 'System Status', href: '/admin/system-status', icon: ServerCog },
            ]
        },
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
                className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-[#080b16] shadow-2xl ring-1 ring-white/10 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`} 
                aria-hidden={!open} 
                style={{ zIndex: 50 }}
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600 shadow">
                                <Image 
                                    src={userImage || '/favicon.ico'} 
                                    alt={userName || 'Admin'} 
                                    width={48} 
                                    height={48} 
                                    className="object-cover w-full h-full" 
                                />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-700">{userName || 'Admin'}</div>
                                <div className="text-xs text-slate-500">Admin Panel</div>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            aria-label="Close menu" 
                            className="p-2 rounded-md hover:bg-slate-100 text-slate-700"
                        >
                            <X />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-auto border-t border-white/10 pt-4">
                        {sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-1 px-2">
                                {section.title && (
                                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 mt-4">
                                        {section.title}
                                    </p>
                                )}
                                {section.links.map((link) => (
                                    <Link 
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center gap-3 rounded-3xl px-4 py-3 text-slate-200 hover:bg-white/5 transition"
                                        onClick={onClose}
                                    >
                                        <link.icon size={18} /> 
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                        <div className="px-2 mt-6">
                            <Link 
                                href="/" 
                                className="block w-full text-center px-4 py-3 bg-violet-600 text-white rounded-3xl font-semibold hover:bg-violet-500 transition"
                                onClick={onClose}
                            >
                                Go to Homepage
                            </Link>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default AdminDrawer
