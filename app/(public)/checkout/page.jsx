import PageClient from './page.client'

export const metadata = {
  title: 'Checkout - Teknova',
  description: 'Complete your purchase on Teknova with a streamlined checkout flow, payment selection, and order summary.',
  keywords: ['checkout', 'payment', 'order summary', 'Teknova', 'electronics checkout'],
  openGraph: {
    title: 'Checkout - Teknova',
    description: 'Complete your purchase with Teknova checkout and secure payment options.',
    url: '/checkout',
    siteName: 'Teknova',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
