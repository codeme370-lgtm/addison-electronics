export const metadata = {
  title: "Admin Dashboard - Teknova",
  description: "Admin dashboard for managing Teknova's electronics store. Monitor orders, products, revenue, and stores.",
  robots: {
    index: false,
    follow: false
  }
};

import AdminClient from './AdminClient'

export default function AdminDashboardPage(){
  return <AdminClient />
}