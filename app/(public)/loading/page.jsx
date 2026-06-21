import PageClient from './page.client'

export const metadata = {
  title: "Loading - Teknova",
  description: "Please wait while we redirect you to your destination on Teknova.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <PageClient />;
}
