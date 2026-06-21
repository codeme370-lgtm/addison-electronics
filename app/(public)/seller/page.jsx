import PageClient from './page.client'

export const metadata = {
  title: "Our Sellers - Teknova",
  description: "Browse trusted sellers on Teknova. Find reliable electronics and tech product vendors with excellent ratings and reviews.",
  keywords: ["sellers", "vendors", "trusted sellers", "electronics sellers", "Teknova"],
  openGraph: {
    title: "Our Sellers - Teknova",
    description: "Discover trusted sellers offering quality electronics and tech products.",
    url: "/seller",
    siteName: "Teknova",
    type: "website"
  }
};

export default function Page() {
  return <PageClient />;
}
