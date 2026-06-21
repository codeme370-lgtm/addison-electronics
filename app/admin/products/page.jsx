import Link from 'next/link'

export const metadata = {
  title: "Manage Products - Admin",
  description: "Admin panel for managing product listings and inventory on Teknova.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Dashboard & Products</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Products</h1>
              <p className="mt-2 text-sm text-slate-400">Browse, manage, and edit your catalog from one place.</p>
            </div>
            <Link
              href="/admin/products/add-product"
              className="inline-flex items-center justify-center rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Add Product
            </Link>
          </div>

          <div className="mt-8 rounded-[28px] border border-slate-800 bg-slate-950/80 p-10 text-center text-slate-400">
            <p className="text-xl font-semibold text-white">Product management coming soon</p>
            <p className="mt-2 max-w-2xl mx-auto text-sm text-slate-500">This page is a placeholder for the full product catalog experience. Use the Add Product section to create new products in the admin panel.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
