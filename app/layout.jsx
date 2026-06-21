import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { AuthProvider } from "@/context/AuthContext";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import "./globals.css";

export const metadata = {
    metadataBase: new URL("https://www.teknova.com"), // Replace with your live URL
    title: "Teknova - Shop Smarter",
    description: "Online retail store offering high-quality home furniture, trendy items, kitchen appliances, and all fashion items. Discover the best deals on furniture and fashion.",
    keywords: ["furniture", "fashion", "kitchen appliances", "home decor", "trendy items", "online shopping", "retail store"],
    verification: {
        google: "mtDIJBRWYPYjWGn7noYLQ7eNfdsH5xfvwUUBJ3lQc_k"
    },
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            noarchive: false,
        }
    },
    openGraph: {
        title: "Teknova - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at Teknova. Shop smarter today!",
        url: "/",
        siteName: "Teknova",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Teknova - Online Retail Store",
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Teknova - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at Teknova. Shop smarter today!",
        images: ["/logo.png"]
    },
    other: {
        "application/ld+json": JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Teknova",
                "url": "https://www.teknova.com",
                "logo": "https://www.teknova.com/logo.png",
                "description": "Online retail store offering high-quality electronics, gaming gear, laptops, and tech accessories.",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-555-123-4567",
                    "contactType": "customer service"
                },
                "sameAs": [
                    "https://www.facebook.com/teknova",
                    "https://www.twitter.com/teknova",
                    "https://www.instagram.com/teknova"
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Teknova",
                "url": "https://www.teknova.com",
                "description": "Shop smarter with Teknova - your go-to destination for electronics and tech products.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.teknova.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            }
        ])
    }
};

export const viewport = {
    width: 'device-width',
    initialScale: 1
};

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
        <html lang="en">
            <body className="antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>
                <StoreProvider>
                    <Toaster />
                    <PageTransitionWrapper>
                        {children}
                    </PageTransitionWrapper>
                </StoreProvider>
            </body>
        </html>
        </AuthProvider>
    );
}
