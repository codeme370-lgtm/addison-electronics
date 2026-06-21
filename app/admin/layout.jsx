import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Teknova - Admin",
    description: "Teknova - Admin",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        }
    }
};

export default function RootAdminLayout({ children }) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}

