'use client'

import HomeCategories from "@/components/HomeCategories";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <HomeCategories />
            <OurSpecs />
        </div>
    );
}
