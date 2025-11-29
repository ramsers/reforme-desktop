import React from 'react'

const StudioSection: React.FC = () => {
    return (
        <div className="text-background relative flex h-full flex-row items-end justify-start bg-[url('/images/studio_background.jpg')] bg-cover bg-center bg-no-repeat p-5 lg:min-h-100">
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="bg-brown-default relative z-10 w-96 rounded-xl p-2 p-3 shadow-2xl lg:mb-6 lg:ml-32">
                <p className="font-heading mb-2 text-center text-3xl leading-8 font-semibold">
                    A space to move, breathe, and grow
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
