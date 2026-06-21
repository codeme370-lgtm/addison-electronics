import PageClient from './page.client'

export const metadata = {
  title: "Manage Stores - Admin",
  description: "Admin panel for managing seller stores and approvals on Teknova.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <PageClient />;
}
