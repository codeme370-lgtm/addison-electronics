'use client'
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useClerk, UserButton,useUser,Protect } from "@clerk/nextjs";

const Navbar = () => {
//let's get the user
const { user } = useUser();
//Get the  sign in form from clerk
const {openSignIn}=useClerk();
    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">jees</span>cage<span className="text-green-600 text-5xl leading-0">.</span>
                        <Protect plan="plus">
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                        </Protect>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>
                         {
                            !user ? (
                             <button onClick={openSignIn} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
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

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        {
                            user ? (
                                <div>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>}
                                         label="My Cart" onClick={()=>router.push('/cart')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>}
                                         label="My Orders" onClick={()=>router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>

                                </div>
                            ): (
<button onClick={openSignIn} className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                            Login
                        </button>
                            )
                        }
                        
                    </div>
                </div>
                
                {/* Mobile Navigation: Search bar and page links on top of banner */}
                <div className="sm:hidden max-w-7xl mx-auto pb-4 space-y-3">
                    {/* Mobile Search Bar */}
                    <form onSubmit={handleSearch} className="flex items-center text-sm gap-3 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 rounded-xl shadow-md border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200">
                        <Search size={20} className="text-green-600 flex-shrink-0" />
                        <input className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 font-medium" type="text" placeholder="Search your favorite products..." value={search} onChange={(e) => setSearch(e.target.value)} required />
                    </form>
                    
                    {/* Mobile Page Navigators */}
                    <div className="flex items-center gap-2 justify-center p-3 bg-gradient-to-r from-indigo-50 to-green-50 rounded-xl border border-indigo-100 shadow-sm">
                        <Link href="/" className="flex-1 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:text-green-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            Home
                        </Link>
                        <Link href="/shop" className="flex-1 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:text-green-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            Shop
                        </Link>
                        <Link href="/about" className="flex-1 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:text-green-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            About
                        </Link>
                        <Link href="/contact" className="flex-1 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:text-green-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar