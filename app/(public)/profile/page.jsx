import PageClient from './page.client'

export const metadata = {
  title: "My Profile - Teknova",
  description: "Manage your account settings, view order history, and update your profile information at Teknova.",
  keywords: ["my profile", "account settings", "user dashboard", "Teknova"],
  openGraph: {
    title: "My Profile - Teknova",
    description: "Access your personal dashboard and manage your Teknova account.",
    url: "/profile",
    siteName: "Teknova",
    type: "website"
  }
};

export default function Page() {
  return <PageClient />;
}
