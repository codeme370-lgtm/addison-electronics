'use client'

import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminDrawer from "./AdminDrawer"
import axios from "axios"

const AdminLayout = ({ children }) => {
    // Unprotected admin layout: always render the admin UI so routes are accessible without login.
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <div className="flex flex-col min-h-screen bg-[#090b16] text-slate-100">
            <AdminNavbar onMenuClick={() => setDrawerOpen(true)} />
            <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <div className="flex flex-1 h-full overflow-y-scroll no-scrollbar">
                <div className="flex-1 h-full p-5 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout