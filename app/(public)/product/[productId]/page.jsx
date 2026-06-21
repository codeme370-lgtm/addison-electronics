import PageClient from './page.client'

export const metadata = {
  title: "Product Details - Teknova",
  description: "View detailed information about electronics and tech products at Teknova. Read reviews, check specifications, and add to cart.",
  keywords: ["product details", "electronics", "tech specs", "reviews", "Teknova"],
  openGraph: {
    title: "Product Details - Teknova",
    description: "Explore detailed product information and specifications.",
    url: "/product",
    siteName: "Teknova",
    type: "product"
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Electronics Product",
      "description": "High-quality electronics and tech product available at Teknova.",
      "brand": {
        "@type": "Brand",
        "name": "Various"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "100"
      }
    })
  }
};

export default function Page() {
  return <PageClient />;
}
