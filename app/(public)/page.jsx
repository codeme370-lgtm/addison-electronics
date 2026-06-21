import Link from 'next/link';
import {
  ArrowRight,
  Crown,
  Headphones,
  Sparkles,
  Truck,
  ShieldCheck,
  Star,
} from 'lucide-react';
import CategoryMarquee from '../../components/CategoryMarquee';

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';

export const metadata = {
  title: "Teknova - Shop Smarter | Electronics, Gaming & Tech",
  description: "Discover the latest in electronics, gaming gear, laptops, and tech accessories at Teknova. Free shipping on orders over GHS99. Shop smarter today!",
  keywords: ["electronics", "gaming", "laptops", "tech accessories", "RTX 4060", "ASUS ROG", "Sony headphones", "online shopping"],
};

const heroFeatures = [
  { title: 'Free Worldwide Shipping', subtitle: `On orders over ${currency}99`, icon: Truck },
  { title: '30-Day Easy Returns', subtitle: 'No questions asked', icon: ShieldCheck },
  { title: '2 Years Warranty', subtitle: 'On all eligible products', icon: ShieldCheck },
  { title: 'Secure Checkout', subtitle: '100% secure payment', icon: Sparkles },
  { title: '24/7 Customer Support', subtitle: 'We’re here to help', icon: Headphones },
];

const categories = [
  { label: 'Laptops', icon: 'Cpu' },
  { label: 'Components', icon: 'MonitorPlay' },
  { label: 'Gaming', icon: 'Gamepad2' },
  { label: 'Peripherals', icon: 'Headphones' },
  { label: 'Monitors', icon: 'Monitor' },
  { label: 'Audio', icon: 'Headphones' },
  { label: 'Networking', icon: 'ImageIcon' },
  { label: 'Accessories', icon: 'ShoppingBag' },
  { label: 'Smartwatch', icon: 'Watch' },
  { label: 'More', icon: 'Sparkles' },
];

const deals = [
  {
    title: 'NVIDIA GeForce RTX 4070 Ti',
    description: '12GB GDDR6X',
    price: `${currency}759.00`,
    oldPrice: `${currency}899.00`,
    discount: '-15%',
    badge: 'Best Seller',
  },
  {
    title: 'Sony WH-1000XM5',
    description: 'Wireless Headphones',
    price: `${currency}278.00`,
    oldPrice: `${currency}348.00`,
    discount: '-20%',
    badge: 'Top Pick',
  },
  {
    title: 'ASUS ROG Zephyrus G14',
    description: '(2024)',
    price: `${currency}1,229.00`,
    oldPrice: `${currency}1,499.00`,
    discount: '-18%',
    badge: 'Hot',
  },
  {
    title: 'Logitech G Pro X',
    description: 'Superlight 2',
    price: `${currency}159.00`,
    oldPrice: `${currency}179.00`,
    discount: '-12%',
    badge: 'New',
  },
  {
    title: 'LG UltraGear 27"',
    description: 'QHD 240Hz',
    price: `${currency}292.00`,
    oldPrice: `${currency}349.00`,
    discount: '-16%',
    badge: 'Featured',
  },
];

const collections = [
  { title: 'Gaming Setup', subtitle: 'Level up your rig', accent: 'from-violet-600 to-slate-950' },
  { title: "Creator's Choice", subtitle: 'Built for creators', accent: 'from-cyan-500 to-slate-950' },
  { title: 'Back to School', subtitle: 'Smart tech, smarter you', accent: 'from-slate-700 to-purple-900' },
  { title: 'Office Essentials', subtitle: 'Work better every day', accent: 'from-indigo-600 to-slate-950' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050714] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.22),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.85),rgba(7,9,22,0.95))]" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-200 shadow-[0_20px_80px_-50px_rgba(124,58,237,0.6)]">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.7)]" />
                New Arrival
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                ASUS ROG Zephyrus G14 <span className="text-violet-400">(2024)</span>
              </h1>
              <p className="max-w-2xl text-slate-300 leading-9 text-lg sm:text-xl">
                Power. Precision. Perfection. Experience next-gen performance with AMD Ryzen 9, RTX 4060, and a stunning 14" OLED display.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(124,58,237,0.8)] transition hover:bg-violet-500">
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link href="/product" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                  View Details
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {heroFeatures.slice(0, 3).map((feature) => (
                  <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_80px_-50px_rgba(15,23,42,0.8)]">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-sky-300 shadow-inner shadow-slate-950/50">
                      <feature.icon size={22} />
                    </div>
                    <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400">{feature.title}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{feature.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -left-12 top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 bottom-14 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="relative rounded-[2.5rem] border border-white/10 bg-[#060814] p-6">
                  <div className="flex items-center justify-between gap-4 text-slate-200">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Featured</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">ROG Zephyrus G14</h2>
                    </div>
                    <div className="rounded-full bg-violet-600/15 px-3 py-2 text-xs uppercase tracking-[0.28em] text-violet-200">Neon</div>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 text-slate-200 shadow-[0_25px_70px_-40px_rgba(124,58,237,0.8)]">
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Starting at</p>
                      <p className="mt-3 text-4xl font-semibold text-white">{`${currency}1,299`}</p>
                      <p className="mt-2 text-sm text-slate-400">RTX 4060 · Ryzen 9 · 14&quot; OLED</p>
                    </div>
                    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Rating</p>
                      <p className="mt-4 flex items-center gap-2 text-3xl font-semibold text-amber-300"><Star size={24} />4.9</p>
                      <p className="mt-2 text-sm text-slate-400">Premium performance, sleek design.</p>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {heroFeatures.map((feature) => (
                      <div key={feature.title} className="rounded-[1.8rem] border border-white/10 bg-slate-950/90 p-4 text-slate-200">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900 text-slate-300">
                          <feature.icon size={20} />
                        </div>
                        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-400">{feature.title}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{feature.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Explore categories</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Shop by category</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
            <Sparkles size={16} /> Trending
          </div>
        </div>
        <CategoryMarquee categories={categories} />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Today&apos;s Best Deals</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Top picks for tech lovers</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#101827] px-4 py-3 text-sm text-slate-300">
              <span className="rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white">Ends in</span>
              <span className="font-semibold text-white">10 : 24 : 56</span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {deals.map((deal) => (
              <div key={deal.title} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 transition hover:-translate-y-1 hover:border-violet-500/40">
                <div className="absolute -top-5 -right-5 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{deal.badge}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{deal.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{deal.description}</p>
                  </div>
                  <div className="rounded-full bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">{deal.discount}</div>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold text-white">{deal.price}</p>
                    <p className="text-sm text-slate-500 line-through">{deal.oldPrice}</p>
                  </div>
                  <Link href="/cart" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-[0_15px_40px_-25px_rgba(124,58,237,0.9)] transition hover:bg-violet-500">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Shop by Collection</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Curated sets for every setup</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            View All Deals <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection.title} href="/category" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 text-white shadow-[0_25px_80px_-50px_rgba(0,0,0,0.8)] transition hover:border-violet-500/50 hover:bg-slate-900/95">
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-violet-500/15 via-transparent to-transparent" />
              <div className="relative z-10 space-y-3">
                <p className="text-lg font-semibold">{collection.title}</p>
                <p className="text-sm text-slate-400">{collection.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-14">
        <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0b101a]/90 via-[#0a0f18]/90 to-[#111827]/90 p-8 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.9)]">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-violet-300">TechNova Prime</p>
              <h2 className="mt-3 text-4xl font-semibold text-white">Exclusive member benefits and offers</h2>
              <p className="mt-4 max-w-xl text-slate-400 leading-8">Join Prime for free express shipping, exclusive discounts, early access to deals, and extended warranty perks across every purchase.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Free Express Shipping</p>
                  <p className="mt-3 text-sm text-slate-200">Fast delivery on every order.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Exclusive Discounts</p>
                  <p className="mt-3 text-sm text-slate-200">Save more on premium products.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.7)]">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
                <Crown size={18} className="text-violet-300" /> Prime Benefits
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Early access</p>
                  <p className="mt-2 text-white">Shop deals before everyone else.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Extended warranty</p>
                  <p className="mt-2 text-white">Add extra coverage on top tech.</p>
                </div>
              </div>
              <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
                Join Prime <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

