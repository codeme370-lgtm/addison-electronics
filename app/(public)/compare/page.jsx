import PageClient from './page.client'

export const metadata = {
  title: 'Compare Products - Teknova',
  description: 'Compare electronics side-by-side on Teknova and choose the best product for your needs.',
  keywords: ['compare products', 'product comparison', 'electronics comparison', 'Teknova'],
  openGraph: {
    title: 'Compare Products - Teknova',
    description: 'Side-by-side product comparison for electronics and tech gear.',
    url: '/compare',
    siteName: 'Teknova',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
