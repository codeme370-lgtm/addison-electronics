'use client'
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useClerk, UserButton,useUser,Protect } from "@clerk/nextjs";
import logo from "@/app/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
//let's get the user
const { user } = useUser();
//Get the  sign in form from clerk
const {openSignIn}=useClerk();
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState('')
    const [cartPulse, setCartPulse] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true)
            const timer = setTimeout(() => setCartPulse(false), 600)
            return () => clearTimeout(timer)
        }
    }, [cartCount])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    const handleOpenSignIn = () => {
        openSignIn({
            redirectUrl: pathname
        })
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-lg flex-shrink-0 border-2 border-green-600">
                            <Image 
                                src={logo} 
                                alt="JeesCage Logo" 
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-3xl sm:text-4xl font-semibold text-slate-700">
                            <span className="text-green-600">jees</span>cage<span className="text-green-600 text-4xl sm:text-5xl leading-0">.</span>
                        </span>
                        <Protect plan="plus">
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                        </Protect>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8">
                        <Link href="/" className="text-slate-700 font-medium hover:text-green-600 transition-all duration-300 relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/shop" className="text-slate-700 font-medium hover:text-green-600 transition-all duration-300 relative group">
                            Shop
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/about" className="text-slate-700 font-medium hover:text-green-600 transition-all duration-300 relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/contact" className="text-slate-700 font-medium hover:text-green-600 transition-all duration-300 relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 rounded-full border-2 border-slate-200 hover:border-green-400 focus-within:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                            <Search size={18} className="text-green-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-500 text-slate-700 font-medium" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-700 font-medium hover:text-green-600 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-green-50">
                            <ShoppingCart size={18} className="group-hover:scale-125 transition-transform duration-300" />
                            Cart
                            {cartCount > 0 && (
                                <span className={`absolute -top-2 left-2 text-[10px] text-white bg-gradient-to-r from-red-500 to-red-600 size-5 rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white ${cartPulse ? 'cart-badge-pulse' : 'cart-badge-bounce'}`}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                         {
                            !user ? (
                             <button onClick={handleOpenSignIn} className="px-8 py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105">
                            Login
                        </button>
                            ): (
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>} 
                                        label="My Orders" onClick={()=>router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                                
                            )
                         }
                        

                    </div>

                    {/* Mobile User Button and Cart Badge */}
                    <div className="sm:hidden flex items-center gap-3">
                        {/* Mobile Cart Badge */}
                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-700 font-semibold hover:text-green-600 transition-all duration-300 p-2 rounded-lg hover:bg-green-50">
                            <ShoppingCart size={20} className="hover:scale-125 transition-transform duration-300" />
                            {cartCount > 0 && (
                                <span className={`absolute -top-1 -right-2 text-[10px] text-white bg-gradient-to-r from-red-500 to-red-600 size-5 rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white ${cartPulse ? 'cart-badge-pulse' : 'cart-badge-bounce'}`}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        
                        {
                            user ? (
                                <div>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>}
                                         label="My Orders" onClick={()=>router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>

                                </div>
                            ): (<button onClick={handleOpenSignIn} className="px-7 py-1.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-sm font-bold transition-all duration-300 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105">
                            Login
                        </button>
                            )
                        }
                        
                    </div>
                </div>
                
                {/* Mobile Navigation: Search bar and page links on top of banner */}
                <div className="sm:hidden max-w-7xl mx-auto pb-4 space-y-3">
                    {/* Mobile Search Bar */}
                    <form onSubmit={handleSearch} className="flex items-center text-sm gap-3 bg-gradient-to-r from-green-50 to-slate-100 px-4 py-3 rounded-2xl shadow-md border-2 border-green-200 hover:shadow-lg hover:border-green-400 focus-within:border-green-500 transition-all duration-300">
                        <Search size={20} className="text-green-600 flex-shrink-0" />
                        <input className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 font-medium" type="text" placeholder="Search your favorite products..." value={search} onChange={(e) => setSearch(e.target.value)} required />
                    </form>
                    
                    {/* Mobile Page Navigators */}
                    <div className="flex items-center gap-2 justify-center p-3 bg-gradient-to-r from-green-50 via-slate-50 to-indigo-50 rounded-2xl border-2 border-green-200 shadow-md">
                        <Link href="/" className="flex-1 px-3 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border border-slate-200 hover:border-green-500">
                            🏠 Home
                        </Link>
                        <Link href="/shop" className="flex-1 px-3 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border border-slate-200 hover:border-blue-500">
                            🛍️ Shop
                        </Link>
                        <Link href="/about" className="flex-1 px-3 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border border-slate-200 hover:border-purple-500">
                            ℹ️ About
                        </Link>
                        <Link href="/contact" className="flex-1 px-3 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border border-slate-200 hover:border-orange-500">
                            📧 Contact
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar