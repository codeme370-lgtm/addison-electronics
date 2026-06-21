import PageClient from './page.client'

export const metadata = {
  title: "My Wishlist - Teknova",
  description: "View and manage your wishlist of favorite electronics and tech products at Teknova. Save items for later purchase.",
  keywords: ["wishlist", "favorites", "saved products", "Teknova"],
  openGraph: {
    title: "My Wishlist - Teknova",
    description: "Keep track of your favorite electronics and tech products in your wishlist.",
    url: "/wishlist",
    siteName: "Teknova",
    type: "website"
  }
};

export default function Page() {
  return <PageClient />;
}
