'use client'
import { PackageIcon, Search, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import logo from "@/app/logo.png";
import Drawer from './Drawer'
import "./Navbar.css";

const Navbar = () => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [search, setSearch] = useState('')
    const [cartPulse, setCartPulse] = useState(false)
    const cartCount = useSelector(state => state.cart.total)
    const wishlistCount = useSelector(state => state.wishlist.total)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showLocationDropdown, setShowLocationDropdown] = useState(false)

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true)
            const timer = setTimeout(() => setCartPulse(false), 600)
            return () => clearTimeout(timer)
        }
    }, [cartCount])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search?q=${search}`)
    }

    const handleOpenSignIn = () => {
        router.push('/sign-in')
    }

    return (
        <nav className="w-full bg-[#06070b] text-slate-200">
            <div className="max-w-[1400px] mx-auto px-4 py-5">
                <div className="rounded-2xl bg-gradient-to-b from-[#0b0e14]/80 to-[#07080b]/80 ring-1 ring-white/5 p-4">
                    <div className="flex items-center gap-6">
                        {/* Left: Logo & Hamburger */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <Link href="/" className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
                                    TN
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-2xl font-bold text-white">Tech<span className="text-violet-400">Nova</span></div>
                                    <div className="text-xs text-slate-400">TECH FOR THE FUTURE</div>
                                </div>
                            </Link>
                        </div>

                        {/* Center: Search */}
                        <div className="flex-1">
                            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#0b0f16] px-3 py-2 rounded-full border border-white/5">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500 text-sm"
                                />
                                <select className="bg-transparent text-slate-300 text-sm outline-none hidden md:block">
                                    <option>All Categories</option>
                                </select>
                                <button type="submit" className="ml-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full px-4 py-2">
                                    <Search size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex flex-col items-center text-center text-slate-300">
                                    <PackageIcon size={20} />
                                    <span className="text-xs">Compare</span>
                                </div>
                                <Link href="/wishlist" className="relative flex flex-col items-center text-slate-300">
                                    <Heart size={20} />
                                    {wishlistCount > 0 && <span className="absolute -top-2 -right-3 bg-violet-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}
                                    <span className="text-xs">Wishlist</span>
                                </Link>
                                <Link href="/cart" className="relative flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
                                    <ShoppingCart size={20} />
                                    <div className="text-left">
                                        <div className="text-xs text-slate-300">Cart</div>
                                        <div className="text-sm font-semibold text-white">${(cartCount * 199).toFixed(2)}</div>
                                    </div>
                                    {cartCount > 0 && <span className={`absolute -top-2 -right-2 text-[10px] text-white bg-red-600 w-5 h-5 rounded-full flex items-center justify-center font-bold`}>{cartCount}</span>}
                                </Link>
                            </div>

                            <div>
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                                            <Image src={user.imageUrl || logo} alt={user?.name || 'User'} width={36} height={36} className="object-cover" />
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <div className="text-sm font-medium">Hi, {user.name?.split(' ')[0] || user.email}</div>
                                            <div className="text-xs text-slate-400">My Account</div>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={handleOpenSignIn} className="bg-violet-600 px-4 py-2 rounded-full text-white">Login</button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Secondary nav */}
                    <div className="mt-4 border-t border-white/5 pt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    All Categories
                                </button>
                                <nav className="hidden md:flex items-center gap-6 ml-4 text-slate-300">
                                    <Link href="/" className={`${pathname === '/' ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Home</Link>
                                    <Link href="/products" className={`${pathname.startsWith('/products') || pathname.startsWith('/product/') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Products</Link>
                                    <Link href="/brands" className={`${pathname.startsWith('/brands') || pathname.startsWith('/brand/') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Brands</Link>
                                    <Link href="/deals" className={`${pathname.startsWith('/deals') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Deals</Link>
                                    <Link href="/video-guides" className={`${pathname.startsWith('/video-guides') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Video Guides <span className="ml-1 text-xs bg-violet-600 px-2 py-0.5 rounded-full">New</span></Link>
                                    <Link href="/about" className={`${pathname.startsWith('/about') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>About Us</Link>
                                    <Link href="/contact" className={`${pathname.startsWith('/contact') ? 'text-white font-medium border-b-2 border-violet-500 pb-1' : 'hover:text-white'}`}>Contact Us</Link>
                                </nav>
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-2 text-violet-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2a1 1 0 00-2 0v1H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-4V2z"/></svg>
                                    <div className="text-sm">Flash Sale</div>
                                    <div className="text-xs font-mono">02 : 45 : 30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)} 
            />
        </nav>
    )
}

export default Navbar