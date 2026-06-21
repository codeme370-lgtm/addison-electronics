'use client'

import Link from "next/link"
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react"
import { usePathname } from 'next/navigation'


const AdminNavbar = ({ onMenuClick }) => {
const pathname = usePathname()
const title = pathname === '/admin' ? 'Dashboard' : pathname.split('/').filter(Boolean).slice(-1)[0]?.replace(/-/g,' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Dashboard'
const {user, signOut}=useAuth()

    return (
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#080b16] text-slate-200">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200 transition hover:bg-white/10" aria-label="Open menu">
                    <Menu size={22} />
                </button>
                <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Admin Panel</p>
                    <h1 className="text-xl font-semibold text-white">{title}</h1>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p className="text-sm text-slate-200">Hi, {user?.fullName || user?.name || user?.email}</p>
                <button 
                    onClick={signOut}
                    className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar