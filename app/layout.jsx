import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
    title: "JeeShop - Shop Smarter",
    description: "Online retail store offering high-quality home furniture, trendy items, kitchen appliances, and all fashion items. Discover the best deals on furniture and fashion.",
    keywords: ["furniture", "fashion", "kitchen appliances", "home decor", "trendy items", "online shopping", "retail store"],
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    openGraph: {
        title: "JeeShop - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at JeeShop. Shop smarter today!",
        url: "https://jeescagemall.com", // Replace with your actual URL
        siteName: "Jeescagemall",
        images: [
            {
                url: "/og-image.jpg", // Add an Open Graph image in public folder
                width: 1200,
                height: 630,
                alt: "JeeShop - Online Retail Store"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "JeeShop - Shop Smarter",
        description: "Discover high-quality home furniture, trendy fashion items, and kitchen appliances at JeeShop. Shop smarter today!",
        images: ["/og-image.jpg"] // Same as Open Graph
    }
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
