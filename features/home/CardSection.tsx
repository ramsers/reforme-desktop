import React from 'react'

const CardSection: React.FC = () => {
    return (
        <div className="py-8">
            <h2 className="text-brown-default text-center text-4xl font-bold">Our Most Popular Classes</h2>
            <div className="flex w-full flex-row flex-wrap justify-around gap-6 py-8">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-brown-default text-3xl font-bold">Reformer INTRO</p>
                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl bg-[url('/images/reformer_intro.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl opacity-75 transition duration-200 md:group-hover:opacity-90 lg:opacity-0"></div>

                        <div className="text-main relative flex-col text-center transition duration-300 lg:hidden lg:group-hover:flex">
                            <p className="leading-8 font-semibold tracking-wider">
                                Curious about Pilates reformer? This intro class teaches you the basics—from setup and
                                alignment to a guided beginner workout—designed to support and challenge any fitness
                                level.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-brown-default text-3xl font-bold">RESTORE+</p>
                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl bg-[url('/images/restore_plus.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl opacity-75 transition duration-200 md:group-hover:opacity-90 lg:opacity-0"></div>

                        <div className="text-main relative flex-col text-center transition duration-300 lg:hidden lg:group-hover:flex">
                            <p className="leading-8 font-semibold tracking-wider">
                                Need a nervous system reset? Want to find ease, mobility, and core control? These
                                classes soothe, restore, melt tension, and build mobility.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-brown-default text-3xl font-bold">BURN+</p>

                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl bg-[url('/images/burn_plus.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl opacity-75 transition duration-200 md:group-hover:opacity-90 lg:opacity-0"></div>
                        <div className="text-main relative flex-col text-center transition duration-300 md:group-hover:flex lg:hidden">
                            <p className="leading-8 font-semibold tracking-wider">
                                Craving that deep signature muscle burn? Want to work HARD and find your edge? These
                                classes incorporate more resistance, more pulses, more reps, and sequencing that will
                                challenge your body from head to toe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSection
