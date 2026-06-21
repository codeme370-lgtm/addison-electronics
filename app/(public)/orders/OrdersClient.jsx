'use client'

import { useMemo, useState } from 'react';
import { Search, ArrowRight, FileText, ShoppingBag, Clock3, CheckCircle2, XCircle } from 'lucide-react';

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';

const dummyOrders = [
  {
    id: 'TN-78491',
    date: 'Jun 20, 2024',
    status: 'Delivered',
    amount: `${currency}2,135.15`,
    payment: 'Visa •••• 4242',
    items: ['ASUS ROG Zephyrus G14', 'Sony WH-1000XM5', 'Gaming Mouse'],
    progress: ['Placed', 'Confirmed', 'Shipped', 'Delivered'],
  },
  {
    id: 'TN-78432',
    date: 'Jun 15, 2024',
    status: 'Shipped',
    amount: `${currency}799.00`,
    payment: 'Mastercard •••• 5555',
    items: ['NVIDIA GeForce RTX 4070 Ti'],
    progress: ['Placed', 'Confirmed', 'Shipped'],
  },
  {
    id: 'TN-78211',
    date: 'Jun 10, 2024',
    status: 'Processing',
    amount: `${currency}1,099.00`,
    payment: 'PayPal',
    items: ['ASUS ROG Zephyrus G14', 'Backpack'],
    progress: ['Placed', 'Confirmed'],
  },
  {
    id: 'TN-77890',
    date: 'May 28, 2024',
    status: 'Delivered',
    amount: `${currency}249.00`,
    payment: 'Visa •••• 4242',
    items: ['Smartwatch'],
    progress: ['Placed', 'Confirmed', 'Shipped', 'Delivered'],
  },
  {
    id: 'TN-76543',
    date: 'May 18, 2024',
    status: 'Cancelled',
    amount: `${currency}189.00`,
    payment: 'Mastercard •••• 5555',
    items: ['Wireless Earbuds'],
    progress: ['Placed', 'Cancelled'],
  },
];

const statusColors = {
  Delivered: 'bg-emerald-500/10 text-emerald-300',
  Shipped: 'bg-sky-500/10 text-sky-300',
  Processing: 'bg-amber-500/10 text-amber-300',
  Cancelled: 'bg-rose-500/10 text-rose-300',
};

const filterTabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersClient() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [query, setQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const tabFiltered = activeTab === 'All Orders'
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === activeTab);

    if (!query) return tabFiltered;
    return tabFiltered.filter((order) =>
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.items.some((item) => item.toLowerCase().includes(query.toLowerCase()))
    );
  }, [activeTab, query]);

  const summary = useMemo(() => ({
    totalOrders: dummyOrders.length,
    totalSpent: `${currency}5,081.15`,
    pending: dummyOrders.filter((order) => order.status === 'Processing').length,
    delivered: dummyOrders.filter((order) => order.status === 'Delivered').length,
    cancelled: dummyOrders.filter((order) => order.status === 'Cancelled').length,
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-6 rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">My Orders</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">View and manage all your orders</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">Need Help?</button>
                <button className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400">Contact Support</button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-slate-950/80 p-4">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm transition ${activeTab === tab ? 'bg-violet-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-3xl bg-slate-950/80 p-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by order ID, product or date..."
                  className="w-full rounded-full border border-slate-800 bg-slate-950/90 py-3 pl-12 pr-4 text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm text-slate-100 transition hover:bg-slate-700">
                Filter <ArrowRight size={16} />
              </button>
            </div>

            <div className="space-y-5">
              {filteredOrders.map((order) => (
                <div key={order.id} className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Order #{order.id}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{order.items[0]}</p>
                      <p className="text-sm text-slate-400">{order.items.length > 1 ? `${order.items.length} items` : '1 item'}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p className="text-sm text-slate-400">{order.date}</p>
                      <p className="text-lg font-semibold text-white">{order.amount}</p>
                      <p className="text-sm text-slate-400">{order.payment}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {order.progress.map((step, index) => (
                        <div key={step} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${index < order.progress.length - 1 ? 'border-violet-500 bg-violet-500/10 text-violet-300' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status === 'Delivered' && <CheckCircle2 size={14} />}
                        {order.status === 'Processing' && <Clock3 size={14} />}
                        {order.status === 'Shipped' && <ShoppingBag size={14} />}
                        {order.status === 'Cancelled' && <XCircle size={14} />}
                        {order.status}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <button className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-violet-500 hover:text-white">View Details</button>
                        <button className="rounded-full bg-white/5 px-4 py-2 text-slate-200 transition hover:bg-white/10">Download Invoice</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 text-center text-slate-400">
                  <p className="text-lg">No orders match your search or filter</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Order Summary</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-4 py-4">
                  <div>
                    <p className="text-sm text-slate-400">Total Orders</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{summary.totalOrders}</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300"><FileText size={18} /></span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-4 py-4">
                  <div>
                    <p className="text-sm text-slate-400">Total Spent</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{summary.totalSpent}</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300"><ShoppingBag size={18} /></span>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Pending Orders</span>
                    <span className="text-white">{summary.pending}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-amber-400" style={{ width: `${(summary.pending / summary.totalOrders) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Delivered Orders</span>
                    <span className="text-white">{summary.delivered}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${(summary.delivered / summary.totalOrders) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Cancelled Orders</span>
                    <span className="text-white">{summary.cancelled}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-rose-400" style={{ width: `${(summary.cancelled / summary.totalOrders) * 100}%` }} />
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">View All Orders</button>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recently Viewed</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">Quick Picks</h2>
                </div>
                <button className="text-sm text-violet-300 hover:text-white">View All</button>
              </div>
              <div className="mt-6 space-y-3">
                {['ASUS ROG Zephyrus G14', 'Sony WH-1000XM5', 'NVIDIA RTX 4070 Ti'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-4 py-3">
                    <span className="text-sm text-slate-100">{item}</span>
                    <span className="text-sm text-slate-400">{item.includes('G14') ? `${currency}1,499.00` : item.includes('XM5') ? `${currency}348.00` : `${currency}799.00`}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
