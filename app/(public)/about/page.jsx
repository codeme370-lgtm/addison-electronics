import Link from "next/link";
import { Award, Users, Zap, Globe, Star } from "lucide-react";

export const metadata = {
    title: "About Teknova - Building Tomorrow with Technology",
    description: "Teknova is committed to bringing the latest electronics with quality, trust, and exceptional customer service.",
    keywords: ["Teknova", "about", "electronics", "technology", "team", "values"],
};

const values = [
    { title: 'Customer First', desc: "Your satisfaction is our top priority.", icon: Users },
    { title: 'Quality Assured', desc: "We offer only genuine products from trusted brands.", icon: Award },
    { title: 'Innovation', desc: "We embrace the latest tech first.", icon: Zap },
    { title: 'Trust & Transparency', desc: "Honest deals and clear communication.", icon: Globe },
    { title: 'Fast & Reliable', desc: "Quick delivery and dependable service.", icon: Star },
    { title: 'Sustainability', desc: "We care for the planet and future.", icon: Star },
];

const team = [
    { name: 'Alex Johnson', role: 'Founder & CEO', image: '/images/team/alex.jpg' },
    { name: 'Sophia Martinez', role: 'Chief Operations Officer', image: '/images/team/sophia.jpg' },
    { name: 'Daniel Lee', role: 'Head of Technology', image: '/images/team/daniel.jpg' },
    { name: 'Emily Davis', role: 'Head of Marketing', image: '/images/team/emily.jpg' },
    { name: 'Michael Brown', role: 'Customer Experience Lead', image: '/images/team/michael.jpg' },
    { name: 'Olivia Wilson', role: 'Product Manager', image: '/images/team/olivia.jpg' },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050714] text-slate-100">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.22),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.85),rgba(7,9,22,0.95))]" />
                <div className="relative mx-auto max-w-[1400px] px-6 py-16">
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-violet-300">ABOUT US</p>
                            <h1 className="mt-4 text-5xl font-semibold">Building Tomorrow <span className="text-violet-400">with Technology Today</span></h1>
                            <p className="mt-6 max-w-2xl text-slate-300 leading-relaxed">At Teknova, we believe technology has the power to transform lives. Our mission is to bring you the latest, most innovative electronics with quality, trust, and exceptional customer service.</p>

                            <div className="mt-8 flex gap-6 flex-wrap">
                                <div className="rounded-2xl bg-[#0b0f1a]/60 p-5">
                                    <div className="text-3xl font-bold text-white">10,000+</div>
                                    <p className="text-sm text-slate-400 mt-1">Products</p>
                                </div>
                                <div className="rounded-2xl bg-[#0b0f1a]/60 p-5">
                                    <div className="text-3xl font-bold text-white">500K+</div>
                                    <p className="text-sm text-slate-400 mt-1">Happy Customers</p>
                                </div>
                                <div className="rounded-2xl bg-[#0b0f1a]/60 p-5">
                                    <div className="text-3xl font-bold text-white">120+</div>
                                    <p className="text-sm text-slate-400 mt-1">Countries Served</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full border border-violet-700/20 h-64 w-64 flex items-center justify-center blur-[40px] opacity-70" />
                            </div>
                            <div className="relative z-10 rounded-[2rem] bg-gradient-to-br from-[#0b1020] to-[#060714] p-8 w-full shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
                                <div className="h-44 flex items-end justify-center">
                                    <div className="rounded-full bg-violet-600/20 p-6 text-4xl font-bold text-violet-300">TN</div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-slate-400">Our Commitment</p>
                                    <p className="mt-2 text-lg font-semibold">Premium products, trusted service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-12">
                <h2 className="text-3xl font-semibold text-white mb-8">Our Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <div key={i} className="rounded-2xl border border-white/6 bg-[#071021] p-6">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 mb-4">
                                    <Icon />
                                </div>
                                <h4 className="font-semibold mb-2">{v.title}</h4>
                                <p className="text-sm text-slate-400">{v.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-12">
                <h2 className="text-3xl font-semibold text-white mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {team.map((m, i) => (
                        <div key={i} className="rounded-2xl bg-[#071021] p-4 text-center">
                            <div className="mx-auto h-28 w-28 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center mb-4">
                                <img src={m.image} alt={m.name} className="object-cover h-full w-full" />
                            </div>
                            <div className="text-sm font-semibold">{m.name}</div>
                            <div className="text-xs text-slate-400">{m.role}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <div className="bg-gradient-to-r from-violet-700 to-sky-600 py-8">
                    <div className="mx-auto max-w-[1400px] px-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-8 items-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">4+</div>
                                <div className="text-sm opacity-90">Years of Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">10,000+</div>
                                <div className="text-sm opacity-90">Products Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">500K+</div>
                                <div className="text-sm opacity-90">Happy Customers</div>
                            </div>
                        </div>
                        <div>
                            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
