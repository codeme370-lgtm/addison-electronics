import AdminBrandsClient from './BrandsClient'

export const metadata = {
  title: 'Manage Brands - Admin',
  description: 'Admin panel for managing brands on Teknova.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminBrandsPage() {
  return <AdminBrandsClient />
}
