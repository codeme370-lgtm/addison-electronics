import { Suspense } from 'react';
import SearchClient from './SearchClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Search Products - Teknova",
  description: "Search for electronics, gaming gear, laptops, and tech accessories at Teknova. Find the perfect product for your needs.",
  keywords: ["search products", "electronics search", "tech products", "Teknova"],
  openGraph: {
    title: "Search Products - Teknova",
    description: "Find your ideal electronics and tech products with Teknova's search.",
    url: "/search",
    siteName: "Teknova",
    type: "website"
  }
};

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchClient />
    </Suspense>
  );
}
