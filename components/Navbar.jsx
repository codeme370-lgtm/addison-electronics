'use client'
import { PackageIcon, Search, ShoppingCart, MapPin, Heart, Home, Grid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useClerk, UserButton, useUser, Protect } from "@clerk/nextjs";
import { useSidebar } from "@/context/SidebarContext";
import logo from "@/app/logo.jpg";
import Drawer from './Drawer'
import "./Navbar.css";

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useSidebar()

    const [search, setSearch] = useState('')
    const [cartPulse, setCartPulse] = useState(false)
    const [searchExpanded, setSearchExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(true)
    const cartCount = useSelector(state => state.cart.total)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showLocationDropdown, setShowLocationDropdown] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
        openSignIn({
            redirectUrl: pathname
        })
    }

    return (
        <nav className="relative bg-white border-b border-gray-200">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 py-3 max-w-full">
                    
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button 
                            aria-label="Open menu" 
                            onClick={() => setDrawerOpen(true)} 
                            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-red-600 shadow hidden sm:flex items-center justify-center">
                                <Image 
                                    src={logo} 
                                    alt="Jeescage Logo" 
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl">
                                <span className="text-red-600">jees</span><span className="text-orange-600">cage</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Search Bar - Responsive */}
                    {searchExpanded ? (
                        // Expanded search on mobile
                        <div className="flex-1 min-w-0">
                            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-orange-400 focus-within:border-orange-500 transition-all">
                                <input 
                                    className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700 text-sm" 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                                <button 
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md flex-shrink-0 transition-all"
                                >
                                    <Search size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchExpanded(false)
                                        setSearch('')
                                    }}
                                    className="text-gray-500 hover:text-gray-700 px-2"
                                >
                                    ✕
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            {/* Compact search on small screens or full search on larger screens */}
                            <div className="hidden sm:block flex-1 min-w-0 transition-all duration-300" style={{
                                maxWidth: sidebarOpen ? 'calc(100% - 360px)' : 'calc(100% - 200px)'
                            }}>
                                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-orange-400 focus-within:border-orange-500 transition-all w-full">
                                    <Search size={18} className="text-gray-400 flex-shrink-0" />
                                    <input 
                                        className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700 text-sm min-w-0" 
                                        type="text" 
                                        placeholder="Search for products, brands..." 
                                        value={search} 
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md flex-shrink-0 transition-all"
                                    >
                                        <Search size={18} />
                                    </button>
                                </form>
                            </div>

                            {/* Search icon button on mobile */}
                            <button 
                                onClick={() => setSearchExpanded(true)}
                                className="sm:hidden p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
                                aria-label="Search"
                            >
                                <Search size={22} />
                            </button>
                        </>
                    )}


                    {/* Right: Location + Orders + Wishlist + Cart + User */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        
                        {/* Location Dropdown - hidden on small screens */}
                        <div className="hidden md:block relative">
                            <button 
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors px-2 py-2 text-sm"
                            >
                                <MapPin size={18} />
                                <div className="text-left">
                                    <div className="text-xs text-gray-600">Deliver to</div>
                                    <div className="font-semibold text-gray-900">Your Location</div>
                                </div>
                            </button>
                            {showLocationDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                                    <p className="text-sm text-gray-600 mb-3">Select your location</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your location" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Home */}
                        <Link 
                            href="/"
                            className={`${searchExpanded ? 'hidden sm:flex' : 'flex'} flex-col items-center justify-center text-gray-700 hover:text-white hover:bg-green-600 bg-gray-50 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95`}
                        >
                            <Home size={20} />
                            <span className="font-semibold">Home</span>
                        </Link>

                        {/* Categories */}
                        <Link 
                            href="/category"
                            className={`hidden md:flex flex-col items-center justify-center text-gray-700 hover:text-white hover:bg-purple-600 bg-gray-50 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95`}
                        >
                            <Grid size={20} />
                            <span className="font-semibold">Categories</span>
                        </Link>

                        {/* Orders - hidden on mobile when search expanded */}
                        <Link 
                            href="/orders"
                            className={`${searchExpanded ? 'hidden sm:flex' : 'flex'} flex-col items-center justify-center text-gray-700 hover:text-white hover:bg-blue-600 bg-gray-50 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-semibold">Orders</span>
                        </Link>

                        {/* Wishlist - hidden on mobile when search expanded */}
                        <Link 
                            href="/wishlist"
                            className={`${searchExpanded ? 'hidden sm:flex' : 'flex'} flex-col items-center justify-center text-gray-700 hover:text-white hover:bg-red-600 bg-gray-50 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95`}
                        >
                            <Heart size={20} />
                            <span className="font-semibold">Wishlist</span>
                        </Link>

                        {/* Cart */}
                        <Link 
                            href="/cart"
                            className="relative flex flex-col items-center justify-center text-gray-700 hover:text-white hover:bg-orange-600 bg-gray-50 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200 transform hover:scale-110 hover:shadow-md active:scale-95"
                        >
                            <ShoppingCart size={20} />
                            <span className="font-semibold">Cart</span>
                            {cartCount > 0 && (
                                <span className={`absolute -top-1 -right-1 text-[10px] text-white bg-red-600 size-5 rounded-full flex items-center justify-center font-bold shadow-lg ${cartPulse ? 'cart-badge-pulse' : 'cart-badge-bounce'}`}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Profile / Login */}
                        {user ? (
                            <div className="flex items-center gap-2 ml-2 px-2 sm:px-3 py-2">
                                <UserButton />
                                <div className="hidden sm:block text-left">
                                    <div className="text-xs text-gray-600">Hello,</div>
                                    <div className="font-semibold text-gray-900 text-sm">{user.firstName}</div>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={handleOpenSignIn}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Drawer 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)} 
                isSidebarMode={!isMobile}
                isSidebarOpen={sidebarOpen}
                onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            />
        </nav>
    )
}

export default Navbar