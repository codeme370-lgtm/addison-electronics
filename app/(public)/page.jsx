'use client'

import HomeCategories from "@/components/HomeCategories";
import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import FrequentlySearched from "@/components/FrequentlySearched";
import LatestProducts from "@/components/LatestProducts";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Home() {
    return (
        <div>
            <Greeting />
            <Hero />
            <FrequentlySearched />
            <LatestProducts />
            <HomeCategories />
            <TestimonialsCarousel />
        </div>
    );
}
