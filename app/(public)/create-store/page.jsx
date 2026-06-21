import PageClient from './page.client'

export const metadata = {
  title: "Create Your Store - Teknova",
  description: "Start selling electronics and tech products on Teknova. Create your online store and reach thousands of customers.",
  keywords: ["create store", "sell electronics", "online store", "Teknova seller"],
  openGraph: {
    title: "Create Your Store - Teknova",
    description: "Join Teknova as a seller and start your online electronics store today.",
    url: "/create-store",
    siteName: "Teknova",
    type: "website"
  }
};

export default function Page() {
  return <PageClient />;
}
