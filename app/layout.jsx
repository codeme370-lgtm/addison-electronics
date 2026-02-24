import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
    title: "JeesCage. - Shop smarter",
    description: "JeesCage. - Shop smarter",
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
    ]
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
