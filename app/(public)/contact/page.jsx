import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Contact Teknova - Get in Touch",
  description: "Contact Teknova for any questions about our electronics and tech products. We're here to help with fast and reliable customer service.",
  keywords: ["contact Teknova", "customer service", "electronics support", "tech help"],
  openGraph: {
    title: "Contact Teknova - Get in Touch",
    description: "Reach out to Teknova for support and inquiries about our electronics and tech products.",
    url: "/contact",
    siteName: "Teknova",
    type: "website"
  }
};

const ContactPage = () => {
  return <ContactPageClient />;
};

export default ContactPage;
