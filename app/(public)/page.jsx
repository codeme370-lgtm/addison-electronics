'use client'

import HomeCategories from "@/components/HomeCategories";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <HomeCategories />
            <TestimonialsCarousel />
            <OurSpecs />
        </div>
    );
}
