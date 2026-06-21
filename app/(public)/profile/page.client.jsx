'use client'

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Package2, ShieldCheck, Star, User } from 'lucide-react';

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Orders', href: '/orders' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Profile', href: '/profile', active: true },
  { label: 'Addresses', href: '/addresses' },
  { label: 'Payment Methods', href: '/payment-methods' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Compare', href: '/compare' },
  { label: 'Video Guides', href: '/video-guides' },
  { label: 'Returns & Refunds', href: '/returns-refunds' },
  { label: 'My Reviews', href: '/my-reviews' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Account Settings', href: '/account-settings' },
  { label: 'Support Tickets', href: '/support-tickets' },
];

const summaryStats = [
  { label: 'Total Orders', value: '24', icon: Package2, color: 'text-violet-300' },
  { label: 'Delivered', value: '18', icon: CheckCircle2, color: 'text-emerald-300' },
  { label: 'Processing', value: '2', icon: Package2, color: 'text-amber-300' },
  { label: 'Cancelled', value: '4', icon: ShieldCheck, color: 'text-rose-300' },
];

const recentOrders = [
  { id: 'TN-78491', date: 'Jun 20, 2024', items: '3 items', total: `${currency}2,135.15`, status: 'Delivered' },
  { id: 'TN-78432', date: 'Jun 15, 2024', items: '1 item', total: `${currency}799.00`, status: 'Shipped' },
  { id: 'TN-78211', date: 'Jun 10, 2024', items: '2 items', total: `${currency}1,099.00`, status: 'Processing' },
  { id: 'TN-77890', date: 'May 28, 2024', items: '1 item', total: `${currency}249.00`, status: 'Delivered' },
  { id: 'TN-76543', date: 'May 18, 2024', items: '1 item', total: `${currency}189.00`, status: 'Cancelled' },
];

const recentlyViewed = [
  { title: 'ASUS ROG Zephyrus G14', price: `${currency}1,499.00` },
  { title: 'Sony WH-1000XM5', price: `${currency}348.00` },
  { title: 'NVIDIA RTX 4070 Ti', price: `${currency}799.00` },
  { title: 'Apple Watch Series 9', price: `${currency}399.00` },
  { title: 'Logitech G Pro X Mouse', price: `${currency}129.99` },
];

const savedAddresses = [
  { title: 'Home', name: 'Alex Johnson', address: '123 West 45th Street, Apt 12B, New York, NY 10036, USA', phone: '+1 (646) 123-4567', default: true },
  { title: 'Office', name: 'Alex Johnson', address: '789 6th Avenue, Floor 3, New York, NY 10001, USA', phone: '+1 (646) 987-6543', default: false },
];

const paymentMethods = [
  { label: 'Visa ending in 4242', details: 'Expires 12/27', default: true },
  { label: 'Mastercard ending in 5555', details: 'Expires 08/26', default: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-10">
        <aside className="hidden w-72 flex-col gap-5 rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] xl:flex">
          <div className="space-y-4 rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500 text-white">
                <User size={24} />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Alex Johnson</p>
                <p className="text-sm text-slate-400">TechNova Member</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-slate-400">
              <p>aleg.johnson@email.com</p>
              <p>+1 (646) 123-4567</p>
              <p>Member since May 2023</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between rounded-3xl px-4 py-3 text-sm transition ${item.active ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/10' : 'border border-slate-800 bg-slate-950/80 text-slate-300 hover:bg-slate-900'}`}
              >
                <span>{item.label}</span>
                {item.active && <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-violet-300">Active</span>}
              </Link>
            ))}
          </nav>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
            <p className="mb-4 font-semibold text-white">Exclusive Member</p>
            <p className="mb-2">Extra 10% Off on all orders</p>
            <button className="mt-3 inline-flex w-full items-center justify-center rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">Shop Now</button>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">My Profile</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Manage your personal information and account preferences.</h1>
              </div>
              <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                <ArrowRight size={16} /> Edit Profile
              </button>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl">
                    <User size={40} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-semibold text-white">Alex Johnson</p>
                      <p className="text-sm text-slate-400">aleg.johnson@email.com • Verified</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
                        <p className="text-slate-400">Phone</p>
                        <p className="mt-2 text-white">+1 (646) 123-4567</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
                        <p className="text-slate-400">Location</p>
                        <p className="mt-2 text-white">New York, USA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-slate-800 bg-slate-900/80 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Account Completion</p>
                      <p className="mt-2 text-lg font-semibold text-white">90% Complete</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">Active</span>
                  </div>
                  <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: '90%' }} />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {['Personal Information', 'Email Verified', 'Phone Verified', 'Add Payment Method', 'Add Address'].map((step) => (
                      <div key={step} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-300">
                        <CheckCircle2 className="text-emerald-300" size={18} />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">TechNova Prime</p>
                      <p className="mt-1 text-lg font-semibold text-white">Member since May 2023</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Active</span>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-300" size={16} /> Free Express Shipping</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-300" size={16} /> Exclusive Member Discounts</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-300" size={16} /> Early Access to Deals</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-300" size={16} /> Extended Warranty</li>
                  </ul>
                  <button className="mt-6 w-full rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">View Membership Benefits</button>
                </div>

                <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Saved Addresses</p>
                    <button className="text-sm text-violet-300 hover:text-violet-200">View All</button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {savedAddresses.map((address) => (
                      <div key={address.title} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{address.title}</p>
                            <p className="mt-2 text-white">{address.name}</p>
                          </div>
                          {address.default && <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">Default</span>}
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{address.address}</p>
                        <p className="mt-2 text-sm text-slate-400">{address.phone}</p>
                        <div className="mt-4 flex gap-3 text-sm text-slate-300">
                          <button className="rounded-full border border-slate-800 px-3 py-2 transition hover:border-violet-500">Edit</button>
                          <button className="rounded-full border border-slate-800 px-3 py-2 transition hover:border-rose-500">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 w-full rounded-3xl border border-violet-500 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20">+ Add New Address</button>
                </div>

                <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Payment Methods</p>
                    <button className="text-sm text-violet-300 hover:text-violet-200">View All</button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.label} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{method.label}</p>
                            <p className="text-sm text-slate-400">{method.details}</p>
                          </div>
                          {method.default && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">Default</span>}
                        </div>
                        <button className="mt-4 rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500">Edit</button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 w-full rounded-3xl border border-violet-500 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20">+ Add New Payment Method</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Order Summary</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Recent Orders</h2>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                  <Star size={18} className="text-violet-300" /> View All Orders
                </div>
              </div>

              <div className="mt-8 rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-400">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-2 transition ${activeTab === tab ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-900'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-slate-800 bg-slate-900/90">
                    <div className="grid grid-cols-[1.3fr_1fr_0.9fr_0.8fr_0.8fr] gap-4 border-b border-slate-800 px-5 py-4 text-xs uppercase tracking-[0.25em] text-slate-500 hidden xl:grid">
                      <span>Order</span>
                      <span>Date</span>
                      <span>Items</span>
                      <span>Total</span>
                      <span>Status</span>
                    </div>
                    <div className="space-y-4 p-5">
                      {recentOrders
                        .filter((order) => activeTab === 'All Orders' || order.status === activeTab)
                        .map((order) => (
                          <div key={order.id} className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                              <div>
                                <p className="text-sm text-slate-400">Order</p>
                                <p className="mt-1 font-semibold text-white">#{order.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Date</p>
                                <p className="mt-1 text-white">{order.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Items</p>
                                <p className="mt-1 text-white">{order.items}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Total</p>
                                <p className="mt-1 text-white">{order.total}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Status</p>
                                <span className={`mt-1 inline-flex rounded-full px-3 py-2 text-xs font-semibold ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-300' : order.status === 'Shipped' ? 'bg-sky-500/10 text-sky-300' : order.status === 'Processing' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
                                  {order.status}
                                </span>
                              </div>
                              <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/90 px-4 py-2 text-sm text-slate-200 transition hover:border-violet-500 xl:mt-0">
                                View Details <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recently Viewed</p>
                <div className="mt-5 grid gap-4">
                  {recentlyViewed.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                      <div className="mb-4 h-28 rounded-3xl bg-slate-950" />
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-slate-400">{item.price}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">View All</button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
