import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
    metadataBase: new URL("https://www.jeescagemall.com"), // Replace with your live URL
    title: "Jeescagemall - Shop Smarter",
    description: "Online retail store offering high-quality home furniture, trendy items, kitchen appliances, and all fashion items. Discover the best deals on furniture and fashion.",
    keywords: ["furniture", "fashion", "kitchen appliances", "home decor", "trendy items", "online shopping", "retail store"],
    verification: {
        google: "mtDIJBRWYPYjWGn7noYLQ7eNfdsH5xfvwUUBJ3lQc_k"
    },
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    openGraph: {
        title: "Jeescagemall - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at JeeShop. Shop smarter today!",
        url: "/",
        siteName: "Jeescagemall",
        images: [
            {
                url: "/favicon.ico", // Use favicon as og-image
                width: 32,
                height: 32,
                alt: "Jeescage - Online Retail Store",
                type: "image/x-icon"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Jeescage - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at JeeShop. Shop smarter today!",
        images: ["/favicon.ico"] // Use favicon as twitter image
    }
};

export const viewport = {
    width: 'device-width',
    initialScale: 1
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/">
        <html lang="en">
            <body className="antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>
                <StoreProvider>
                    <SidebarProvider>
                        <Toaster />
                        {children}
                    </SidebarProvider>
                </StoreProvider>
            </body>
        </html>
        </ClerkProvider>
    );
}
