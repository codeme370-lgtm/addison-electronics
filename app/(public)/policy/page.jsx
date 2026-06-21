import PageClient from './page.client'

export const metadata = {
  title: "Privacy & Policy - Teknova",
  description: "Read Teknova's privacy policy and terms of service. Learn how we protect your data and our policies for using our electronics store.",
  keywords: ["privacy policy", "terms of service", "data protection", "Teknova policies"],
  openGraph: {
    title: "Privacy & Policy - Teknova",
    description: "Understand Teknova's commitment to privacy and our terms of service.",
    url: "/policy",
    siteName: "Teknova",
    type: "website"
  }
};

export default function Page() {
  return <PageClient />;
}
