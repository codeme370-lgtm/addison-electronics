import PageClient from './page.client'

export const metadata = {
  title: "Manage Coupons - Admin",
  description: "Admin panel for managing discount coupons and promotions on Teknova.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <PageClient />;
}
