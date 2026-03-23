import StoreLayout from "@/components/store/StoreLayout";
import {SignedIn, SignIn, SignedOut} from "@clerk/nextjs";

export const metadata = {
    title: "JeesCage. - Store Dashboard",
    description: "JeesCage. - Store Dashboard",
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
        <>
        <SignedIn>
<StoreLayout>
                {children} 
            </StoreLayout>
        </SignedIn>
        <SignedOut> 
            <div className="min-h-screen flex items-center justify-center">
              <SignIn fallbackRedirectUrl="/store" routing="hash"/>
            </div>
        </SignedOut>
            
        </>
    );
}
