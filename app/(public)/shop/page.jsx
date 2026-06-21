export const metadata = {
  title: "Shop Electronics - Teknova",
  description: "Browse and shop for the latest electronics, gaming gear, laptops, and tech accessories at Teknova. Free shipping available.",
  keywords: ["shop electronics", "gaming gear", "laptops", "tech accessories", "online store", "Teknova"],
  openGraph: {
    title: "Shop Electronics - Teknova",
    description: "Explore our extensive collection of electronics and tech products.",
    url: "/shop",
    siteName: "Teknova",
    type: "website",
  },
}

import ShopClient from './ShopClient'

export default function ShopPage() {
  return <ShopClient />
}
