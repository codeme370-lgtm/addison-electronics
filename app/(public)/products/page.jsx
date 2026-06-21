import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Products - Teknova',
  description: 'Browse all Teknova products and find the latest electronics, gaming gear, and accessories.',
}

export default function ProductsPage() {
  redirect('/shop')
}
