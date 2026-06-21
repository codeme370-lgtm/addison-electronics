import PageClient from './page.client'

export const metadata = {
  title: "Seller Dashboard - Teknova",
  description: "Manage your seller store on Teknova. View orders, products, and analytics for your electronics business.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <PageClient />;
}
