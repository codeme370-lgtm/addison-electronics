import AdminCategoriesClient from './CategoriesClient'

export const metadata = {
  title: 'Manage Categories - Admin',
  description: 'Admin panel for viewing and managing product categories on Teknova.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminCategoriesPage() {
  return <AdminCategoriesClient />
}
