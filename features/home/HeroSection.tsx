import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const HeroSection: React.FC = () => {
    return (
        <div className="text-background relative flex h-full min-h-96 flex-row items-end justify-center bg-[url('/images/main_hero.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/35"></div>

            <div className="relative z-10 flex flex-col items-center pb-5">
                <div className="font-heading text-center text-4xl leading-8 md:text-5xl lg:text-6xl">
                    Elevated Movement. Core Strength.
                </div>
                <p className="mt-16 uppercase">discover courses</p>
                <ChevronDownIcon className="animate-bounce-3 mt-16 h-8 w-8" />
            </div>
        </div>
    )
}

export default HeroSection
