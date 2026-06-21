import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Deals - Teknova',
  description: 'Discover Teknova deals, flash sales, and limited-time discounts on top electronics.',
}

export default function DealsPage() {
  redirect('/shop?section=flash')
}
