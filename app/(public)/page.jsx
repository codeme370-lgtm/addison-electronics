'use client'

import HomeCategories from "@/components/HomeCategories";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import FrequentlySearched from "@/components/FrequentlySearched";
import LatestProducts from "@/components/LatestProducts";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Home() {
    return (
        <div>
            <Hero />
            <FrequentlySearched />
            <LatestProducts />
            <HomeCategories />
            <TestimonialsCarousel />
            <OurSpecs />
        </div>
    );
}
