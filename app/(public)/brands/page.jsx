import BrandsContent from './BrandsContent'

export const metadata = {
  title: 'Brands - Teknova',
  description: 'Browse top electronics brands on Teknova and discover featured products from each manufacturer.',
  keywords: ['brands', 'electronics brands', 'technology brands', 'Teknova'],
  openGraph: {
    title: 'Brands - Teknova',
    description: 'Discover brand-specific collections and featured electronics on Teknova.',
    url: '/brands',
    siteName: 'Teknova',
    type: 'website',
  },
};

export default function BrandsPage() {
  return <BrandsContent />
}
