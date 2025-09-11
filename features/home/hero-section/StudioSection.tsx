import React from 'react'
import {ChevronDownIcon} from "@heroicons/react/24/outline";

const StudioSection: React.FC = () => {
    return (
        <div className="text-background relative flex h-full lg:min-h-100 flex-row items-end justify-start bg-[url('/images/studio_background.jpg')]
        bg-cover bg-center bg-no-repeat p-5">
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 bg-brown-default p-3 w-96 rounded-xl lg:ml-32 lg:mb-6 shadow-2xl p-2">
                <p className="font-heading text-3xl text-center leading-8 font-semibold mb-2">
                    A space to move,
                    breathe, and grow
                </p>
                <p>
                    At Reformé, we specialize in Reformer Pilates that strengthens your body, improves posture, and
                    enhances overall movement. Whether you’re new or experienced, our expert-led sessions build core
                    strength, flexibility, and confidence in a calm, welcoming space.
                </p>
            </div>
        </div>
    )
}

export default StudioSection
