import StoreLayoutClient from './layout.client';

export const metadata = {
    title: "Teknova - Store Dashboard",
    description: "Teknova - Store Dashboard",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        }
    }
};

export default function StoreLayout({ children }) {
    return <StoreLayoutClient>{children}</StoreLayoutClient>;
}
