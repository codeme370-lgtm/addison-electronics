import PageClient from './page.client'

export const metadata = {
  title: "Approve Stores - Admin",
  description: "Admin panel for approving new seller stores on Teknova.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <PageClient />;
}
