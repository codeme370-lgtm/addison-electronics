'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Download, Eye, Filter, Search, MoreVertical, ShieldCheck, Truck, Wallet } from 'lucide-react'

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS'

const tabItems = [
  { label: 'All Orders', key: 'All Orders' },
  { label: 'Pending', key: 'Pending' },
  { label: 'Processing', key: 'Processing' },
  { label: 'Shipped', key: 'Shipped' },
  { label: 'Delivered', key: 'Delivered' },
  { label: 'Cancelled', key: 'Cancelled' },
]

const dummyOrders = [
  { id: '#TN12345', customer: 'Alex Johnson', email: 'alexjohnson@email.com', date: 'May 15, 2024', time: '10:30 AM', total: `${currency}1,299.00`, items: '1 item', payment: 'Credit Card', status: 'Delivered' },
  { id: '#TN12344', customer: 'Sarah Williams', email: 'sarah.w@email.com', date: 'May 15, 2024', time: '09:15 AM', total: `${currency}278.00`, items: '2 items', payment: 'PayPal', status: 'Processing' },
  { id: '#TN12343', customer: 'Michael Brown', email: 'michael.b@email.com', date: 'May 14, 2024', time: '08:45 PM', total: `${currency}159.00`, items: '1 item', payment: 'Credit Card', status: 'Shipped' },
  { id: '#TN12342', customer: 'Emily Davis', email: 'emily.d@email.com', date: 'May 14, 2024', time: '06:20 PM', total: `${currency}759.00`, items: '1 item', payment: 'Credit Card', status: 'Delivered' },
  { id: '#TN12341', customer: 'David Wilson', email: 'david.w@email.com', date: 'May 14, 2024', time: '04:10 PM', total: `${currency}92.00`, items: '1 item', payment: 'COD', status: 'Pending' },
  { id: '#TN12340', customer: 'Jessica Taylor', email: 'jessica.t@email.com', date: 'May 13, 2024', time: '11:30 AM', total: `${currency}1,499.00`, items: '2 items', payment: 'Credit Card', status: 'Delivered' },
  { id: '#TN12339', customer: 'Daniel Martinez', email: 'daniel.m@email.com', date: 'May 13, 2024', time: '10:05 AM', total: `${currency}188.00`, items: '1 item', payment: 'PayPal', status: 'Cancelled' },
  { id: '#TN12338', customer: 'Sophia Anderson', email: 'sophia.a@email.com', date: 'May 12, 2024', time: '09:50 PM', total: `${currency}349.00`, items: '1 item', payment: 'Credit Card', status: 'Refunded' },
  { id: '#TN12337', customer: 'James Thomas', email: 'james.t@email.com', date: 'May 12, 2024', time: '07:25 PM', total: `${currency}279.00`, items: '1 item', payment: 'Credit Card', status: 'Processing' },
  { id: '#TN12336', customer: 'Olivia White', email: 'olivia.w@email.com', date: 'May 12, 2024', time: '05:15 PM', total: `${currency}1,099.00`, items: '1 item', payment: 'Credit Card', status: 'Shipped' },
]

const activityFeed = [
  { label: 'New order #TN12345', description: 'Alex Johnson', time: '10 minutes ago', status: 'new' },
  { label: 'Order #TN12344 marked as Processing', description: 'Sarah Williams', time: '25 minutes ago', status: 'processing' },
  { label: 'Order #TN12343 shipped', description: 'Michael Brown', time: '1 hour ago', status: 'shipped' },
  { label: 'Order #TN12342 delivered', description: 'Emily Davis', time: '2 hours ago', status: 'delivered' },
  { label: 'Refund processed for #TN12339', description: 'Daniel Martinez', time: '3 hours ago', status: 'cancelled' },
]

const statusMap = {
  Delivered: 'bg-emerald-500/10 text-emerald-300',
  Processing: 'bg-amber-500/10 text-amber-300',
  Shipped: 'bg-sky-500/10 text-sky-300',
  Pending: 'bg-violet-500/10 text-violet-300',
  Cancelled: 'bg-rose-500/10 text-rose-300',
  Refunded: 'bg-slate-500/10 text-slate-400',
}

export default function AdminOrdersClient() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const [search, setSearch] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('All')

  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      const matchesTab = activeTab === 'All Orders' || order.status === activeTab
      const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || order.customer.toLowerCase().includes(search.toLowerCase()) || order.email.toLowerCase().includes(search.toLowerCase())
      const matchesPayment = paymentFilter === 'All' || order.payment === paymentFilter
      return matchesTab && matchesSearch && matchesPayment
    })
  }, [activeTab, search, paymentFilter])

  const summary = useMemo(() => {
    const totalOrders = dummyOrders.length
    const totalRevenue = dummyOrders.reduce((sum, order) => sum + Number(order.total.replace(/[$,]/g, '')), 0)
    const avgOrder = totalRevenue / totalOrders
    const pending = dummyOrders.filter((order) => order.status === 'Pending').length
    const processing = dummyOrders.filter((order) => order.status === 'Processing').length
    const delivered = dummyOrders.filter((order) => order.status === 'Delivered').length
    const cancelled = dummyOrders.filter((order) => order.status === 'Cancelled').length
    return { totalOrders, totalRevenue, avgOrder, pending, processing, delivered, cancelled }
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <section className="flex-1 space-y-6">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Dashboard & Orders</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">All Orders</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage and track all customer orders from purchase through delivery.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 transition hover:border-violet-500 hover:text-white">
                  <Filter size={16} /> Filters
                </button>
                <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                  <Download size={16} /> Export
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total Orders</p>
                <p className="mt-3 text-2xl font-semibold text-white">1,248</p>
                <p className="mt-1 text-xs text-emerald-300">+12.5% this month</p>
              </div>
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Pending</p>
                <p className="mt-3 text-2xl font-semibold text-white">156</p>
                <p className="mt-1 text-xs text-emerald-300">+8.3% this month</p>
              </div>
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Processing</p>
                <p className="mt-3 text-2xl font-semibold text-white">326</p>
                <p className="mt-1 text-xs text-emerald-300">+15.2% this month</p>
              </div>
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Delivered</p>
                <p className="mt-3 text-2xl font-semibold text-white">678</p>
                <p className="mt-1 text-xs text-emerald-300">+10.7% this month</p>
              </div>
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Cancelled</p>
                <p className="mt-3 text-2xl font-semibold text-white">88</p>
                <p className="mt-1 text-xs text-rose-300">-5.1% this month</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative max-w-xl flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order ID, customer, email..."
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-500 focus:ring-violet-500/20"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">Payment</label>
                  <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="mt-2 w-full bg-transparent text-sm text-slate-100 outline-none">
                    <option>All</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>COD</option>
                  </select>
                </div>
                <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                  <Eye size={16} /> View
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/80">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3 text-left">
                  <thead className="bg-slate-900/80">
                    <tr className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      <th className="px-5 py-4">Order ID</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Payment</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="rounded-[24px] border border-slate-800 bg-slate-900/90 align-top">
                        <td className="px-5 py-4 text-slate-100">{order.id}</td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-white">{order.customer}</p>
                          <p className="mt-1 text-xs text-slate-500">{order.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-white">{order.date}</p>
                          <p className="mt-1 text-xs text-slate-500">{order.time}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-100">{order.payment}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold ${statusMap[order.status] || 'bg-slate-500/10 text-slate-400'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button className="rounded-full border border-slate-800 bg-slate-950/90 px-3 py-2 text-sm text-slate-200 transition hover:border-violet-500">Details</button>
                            <button className="rounded-full border border-slate-800 bg-slate-950/90 px-3 py-2 text-sm text-slate-200 transition hover:border-violet-500">Action</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="rounded-[24px] border border-slate-800 bg-slate-900/90 p-8 text-center text-slate-500">
                  No orders match your current filters.
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="hidden w-[360px] space-y-6 xl:block">
          <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Order Summary</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[28px] bg-slate-900/90 p-5">
                <p className="text-sm text-slate-400">Total Orders</p>
                <p className="mt-3 text-3xl font-semibold text-white">{summary.totalOrders}</p>
              </div>
              <div className="rounded-[28px] bg-slate-900/90 p-5">
                <p className="text-sm text-slate-400">Total Revenue</p>
                <p className="mt-3 text-3xl font-semibold text-white">{`${currency}${summary.totalRevenue.toLocaleString()}`}</p>
              </div>
              <div className="rounded-[28px] bg-slate-900/90 p-5">
                <p className="text-sm text-slate-400">Average Order Value</p>
                <p className="mt-3 text-3xl font-semibold text-white">{`${currency}${summary.avgOrder.toFixed(2)}`}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Status Overview</p>
              <span className="rounded-full bg-slate-900/90 px-3 py-2 text-xs text-slate-300">{summary.totalOrders} Total</span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: 'Pending', value: summary.pending, color: 'bg-violet-400' },
                { label: 'Processing', value: summary.processing, color: 'bg-amber-400' },
                { label: 'Delivered', value: summary.delivered, color: 'bg-emerald-400' },
                { label: 'Cancelled', value: summary.cancelled, color: 'bg-rose-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-3xl bg-slate-900/90 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-3 w-3 rounded-full ${item.color}`} />
                    <div>
                      <p className="text-sm text-slate-300">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value} ({((item.value / summary.totalOrders) * 100).toFixed(0)}%)</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent Activity</p>
              <button className="text-sm text-violet-300 hover:text-violet-200">View All</button>
            </div>
            <div className="mt-5 space-y-4">
              {activityFeed.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
