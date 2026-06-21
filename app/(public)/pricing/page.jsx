export const metadata = {
  title: "Pricing Plans - Teknova",
  description: "Explore Teknova's pricing plans for sellers. Start your online electronics store with competitive rates.",
  keywords: ["pricing", "plans", "seller pricing", "Teknova subscription"],
  openGraph: {
    title: "Pricing Plans - Teknova",
    description: "Choose the right plan to start selling electronics on Teknova.",
    url: "/pricing",
    siteName: "Teknova",
    type: "website"
  }
};

export default function PricingPage() {
    return (
        <main className="mx-auto max-w-6xl py-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">Pricing</p>
                <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Choose the plan that fits your electronics business</h1>
                <p className="mt-4 text-base leading-8 text-slate-600">Start selling with Teknova and scale your store with seller features, support, and performance tools.</p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Starter</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900">Free</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">Launch your store with basic features and start selling electronics today.</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Unlimited products</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Basic analytics</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Email support</li>
                    </ul>
                    <button className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Choose Starter</button>
                </section>
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Growth</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900">₵29 / month</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">Grow your business with advanced tools for sellers and store management.</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Priority support</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Advanced analytics</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Discount coupons</li>
                    </ul>
                    <button className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Choose Growth</button>
                </section>
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Business</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900">₵79 / month</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">Perfect for established sellers who want full control over a high-volume shop.</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Premium support</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Store optimization</li>
                        <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />Custom branding</li>
                    </ul>
                    <button className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Choose Business</button>
                </section>
            </div>
        </main>
    )
}