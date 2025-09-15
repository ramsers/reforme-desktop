'use client'

import HeroSection from '@features/home/HeroSection'
import CardSection from '@features/home/CardSection'
import StudioSection from "@features/home/hero-section/StudioSection";


export default function Home() {
    return (
        <>
            <HeroSection />
            <CardSection />
            <StudioSection />
        </>
    )
}
