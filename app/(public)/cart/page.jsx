import CartClient from './CartClient';

export const metadata = {
  title: "Shopping Cart - Teknova",
  description: "Review and manage your shopping cart at Teknova. Secure checkout for electronics and tech products.",
  keywords: ["shopping cart", "checkout", "electronics", "tech products", "Teknova"],
  openGraph: {
    title: "Shopping Cart - Teknova",
    description: "Secure your electronics and tech purchases with Teknova's easy checkout process.",
    url: "/cart",
    siteName: "Teknova",
    type: "website",
  },
};

export default function CartPage() {
  return <CartClient />;
}
