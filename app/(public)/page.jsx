'use client'

import MegaSaleBanner from "@/components/MegaSaleBanner";
import QuickLinks from "@/components/QuickLinks";
import FlashDealsSection from "@/components/FlashDealsSection";
import PopularCategoriesSection from "@/components/PopularCategoriesSection";
import BestSellersSection from "@/components/BestSellersSection";
import TopRatedSection from "@/components/TopRatedSection";
import WhyShopWithUsSection from "@/components/WhyShopWithUsSection";

export default function Home() {
    return (
        <div className='min-h-screen'>
            {/* Mega Sale Banner - Full width white background */}
            <div className='bg-white px-4 md:px-8 py-6 md:py-8'>
                <div className='max-w-7xl mx-auto'>
                    <MegaSaleBanner />
                </div>
            </div>

            {/* Quick Links - White background */}
            <QuickLinks />

            {/* Flash Deals Section - White background */}
            <FlashDealsSection />

            {/* Popular Categories - Gray background */}
            <PopularCategoriesSection />

            {/* Best Sellers - White background */}
            <BestSellersSection />

            {/* Top Rated - Gray background */}
            <TopRatedSection />

            {/* Why Shop With Us - White background with borders */}
            <WhyShopWithUsSection />
        </div>
    );
}
