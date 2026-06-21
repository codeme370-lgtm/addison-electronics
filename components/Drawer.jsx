'use client'

import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useAuth } from '@/context/AuthContext'
import {
  X,
  ChevronLeft,
  Home,
  Grid,
  ShoppingBag,
  Tag,
  Sparkles,
  Video,
  Heart,
  Scale,
  Package,
  Truck,
  RotateCcw,
  User,
  MapPin,
  CreditCard,
  Bell,
  Headphones,
  Settings,
  LogOut,
  Box,
  Layers,
  SlidersHorizontal,
  Star,
  Users,
  Ticket,
  Image,
  Mail,
  FileText,
  Edit3,
} from 'lucide-react'
import logo from '@/app/logo.png'

const Drawer = ({ open, onClose, isSidebarMode = false, isSidebarOpen = true, onSidebarToggle = () => {} }) => {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const cartCount = useSelector(state => state.cart.total)
  const wishlistCount = useSelector(state => state.wishlist.total)
  const notificationCount = 5
  const compareCount = 2

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Categories', href: '/category', icon: Grid },
    { name: 'Products', href: '/shop', icon: ShoppingBag },
    { name: 'Brands', href: '/brands', icon: Tag },
    { name: 'Deals & Offers', href: '/shop?sort=deals', icon: Sparkles, badge: 'New' },
    { name: 'Video Guides', href: '/video-guides', icon: Video },
    { name: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : null },
    { name: 'Compare', href: '/compare', icon: Scale, badge: compareCount > 0 ? compareCount : null },
    { name: 'Orders', href: '/orders', icon: Package },
    { name: 'Track Order', href: '/track-order', icon: Truck },
    { name: 'Returns & Refunds', href: '/returns-refunds', icon: RotateCcw },
    { name: 'My Account', href: '/profile', icon: User },
    { name: 'Addresses', href: '/addresses', icon: MapPin },
    { name: 'Payment Methods', href: '/payment-methods', icon: CreditCard },
    { name: 'Notifications', href: '/notifications', icon: Bell, badge: notificationCount > 0 ? notificationCount : null },
  ]

  const adminSections = [
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
        { name: 'Returns & Refunds', href: '/admin/returns', icon: RotateCcw },
      ]
    },
    {
      title: 'MARKETING & CONTENT',
      links: [
        { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
        { name: 'Banners', href: '/admin/banners', icon: Image },
        { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
        { name: 'Pages', href: '/admin/pages', icon: FileText },
        { name: 'Blog Posts', href: '/admin/blog-posts', icon: Edit3 },
      ]
    },
    {
      title: 'SYSTEM & SETTINGS',
      links: [
        { name: 'Users & Roles', href: '/admin/users', icon: User },
        { name: 'Payment Methods', href: '/admin/payment-methods', icon: CreditCard },
        { name: 'Shipping Methods', href: '/admin/shipping-methods', icon: Truck },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    },
  ]

  const actionItems = [
    { name: 'Support', href: '/support-tickets', icon: Headphones },
    { name: 'Settings', href: '/account-settings', icon: Settings },
    { name: 'Logout', icon: LogOut, action: signOut },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      {!isSidebarMode && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={onClose}
            style={{ zIndex: 40 }}
          />
          <aside
            className={`fixed inset-y-0 left-0 w-[min(90vw,320px)] bg-slate-950 text-slate-100 shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            aria-hidden={!open}
            style={{ zIndex: 50 }}
          >
            {pathname?.startsWith('/admin') ? (
              <AdminDrawerContent onClose={onClose} sections={adminSections} />
            ) : (
              <DrawerContent
                onClose={onClose}
                navItems={navItems}
                actionItems={actionItems}
                user={user}
                isSidebar={false}
                isActive={isActive}
              />
            )}
          </aside>
        </>
      )}

      {isSidebarMode && (
        <>
          <div
            className={`hidden md:flex fixed left-0 top-0 h-20 bg-slate-950 border-b border-slate-800 items-center transition-all duration-300 z-50 ${isSidebarOpen ? 'w-80' : 'w-20'}`}
          >
            <div className={`flex items-center gap-3 p-4 w-full ${isSidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 shadow-inner bg-slate-900 flex items-center justify-center">
                <NextImage src={logo} alt="Teknova" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              {isSidebarOpen && (
                <div className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">
                  Tek<span className="text-amber-400">Nova</span>
                </div>
              )}
            </div>
          </div>

          <aside
            className={`hidden md:flex fixed left-0 top-20 h-[calc(100vh-80px)] bg-slate-950 border-r border-slate-800 flex-col transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}
            style={{ zIndex: 40 }}
          >
            <button
              onClick={onSidebarToggle}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft size={18} className={`${!isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSidebarOpen ? (
              pathname?.startsWith('/admin') ? (
                <AdminDrawerContent onClose={() => {}} sections={adminSections} isSidebar={true} />
              ) : (
                <DrawerContent
                  onClose={() => {}}
                  navItems={navItems}
                  actionItems={actionItems}
                  user={user}
                  isSidebar={true}
                  isActive={isActive}
                />
              )
            ) : (
              <div className="flex flex-col h-full py-4 px-1 gap-3">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col items-center gap-3">
                    {navItems.map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          title={item.name}
                          className="relative p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                        >
                          <Icon size={18} />
                          {item.badge && (
                            <span className="absolute -top-1 -right-1 min-w-[18px] rounded-full bg-amber-400 px-1.5 text-[10px] font-semibold text-slate-950 leading-none text-center">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    {actionItems.map((item, idx) => {
                      const Icon = item.icon
                      if (item.action) {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={item.action}
                            aria-label={item.name}
                            className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                          >
                            <Icon size={18} />
                          </button>
                        )
                      }

                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          aria-label={item.name}
                          className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                        >
                          <Icon size={18} />
                        </Link>
                      )
                    })}
                  </div>

                  <div className="p-2 rounded-2xl bg-slate-900 text-slate-300">
                    <span className="sr-only">User</span>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {open && (
            <div className="fixed inset-0 bg-black/40 transition-opacity md:hidden" onClick={onClose} style={{ zIndex: 40 }} />
          )}
        </>
      )}
    </>
  )
}

function DrawerContent({ onClose, navItems, actionItems, user, isSidebar, isActive }) {
  return (
    <div className={`h-full flex flex-col overflow-y-auto ${isSidebar ? 'pt-6 pb-6' : 'pt-4 pb-6'} px-4`}> 
      {!isSidebar && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
              <Image src={logo} alt="Teknova" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Welcome back</div>
              <div className="text-xs text-slate-400">Your curated shopping hub</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="space-y-3">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <div key={idx}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-3xl px-3 py-3 transition ${
                  active ? 'bg-slate-800 shadow-lg shadow-slate-950/20' : 'hover:bg-slate-900/80'
                }`}
              >
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                  active ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 group-hover:bg-amber-400 group-hover:text-slate-950'
                }`}>
                  <Icon size={18} />
                </span>
                <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-slate-200'}`}>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-amber-400 px-2 py-1 text-[11px] font-semibold text-slate-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
        {actionItems.map((item, idx) => {
          const Icon = item.icon
          if (item.action) {
            return (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="w-full flex items-center gap-3 rounded-3xl px-3 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-300">
                  <Icon size={18} />
                </span>
                <span className="font-semibold text-sm">{item.name}</span>
              </button>
            )
          }

          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-3xl px-3 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-300">
                <Icon size={18} />
              </span>
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-lg font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white">{user?.name || user?.email || 'Guest User'}</div>
            <div className="text-xs text-slate-400">Premium Member</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminDrawerContent({ onClose, sections, isSidebar = false }){
  return (
    <div className={`h-full flex flex-col overflow-y-auto ${isSidebar ? 'pt-6 pb-6' : 'pt-4 pb-6'} px-4`}>
      {!isSidebar && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
              <Image src={logo} alt="Teknova" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Admin Panel</div>
              <div className="text-xs text-slate-400">Management</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="space-y-3">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="px-2">
            {section.title && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 mt-4">{section.title}</p>
            )}
            {section.links.map((ln) => (
              <Link key={ln.href} href={ln.href} onClick={onClose} className="group flex items-center gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-900/80">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 group-hover:bg-amber-400 group-hover:text-slate-950">
                  <ln.icon size={18} />
                </span>
                <span className="font-semibold text-sm text-slate-200">{ln.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-lg font-bold">A</div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white">Administrator</div>
            <div className="text-xs text-slate-400">Manage the store</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
