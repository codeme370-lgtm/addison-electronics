import OrdersClient from './OrdersClient';

export const metadata = {
  title: "My Orders - Teknova",
  description: "Track and manage your orders at Teknova. View order history, status updates, and delivery information.",
  keywords: ["my orders", "order tracking", "purchase history", "Teknova"],
  openGraph: {
    title: "My Orders - Teknova",
    description: "Keep track of your electronics and tech purchases with Teknova's order management.",
    url: "/orders",
    siteName: "Teknova",
    type: "website",
  },
};

export default function OrdersPage() {
  return <OrdersClient />;
}
