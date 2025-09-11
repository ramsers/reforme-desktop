import React from 'react'
import { connect } from 'react-redux'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type CardSectionOwnProps = {}

type CardSectionSliceProps = {}

type CardSectionDispatchProps = {}

type CardSectionProps = CardSectionOwnProps & CardSectionSliceProps & CardSectionDispatchProps

const CardSection: React.FC<CardSectionProps> = () => {
    return (
        <div className="py-8">
            <h2 className="text-center text-4xl font-bold text-brown-default">Our Most Popular Classes</h2>
            <div className="flex w-full flex-row justify-around py-8 flex-wrap gap-6">
                <div className="flex flex-col gap-3 items-center">
                    <p className="text-3xl font-bold text-brown-default">Reformer INTRO</p>
                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl
                bg-[url('/images/reformer_intro.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl lg:opacity-0 opacity-75 transition duration-200 md:group-hover:opacity-90"></div>

                        <div className="text-main relative lg:hidden lg:group-hover:flex flex-col text-center transition duration-300">
                            <p className="font-semibold leading-8 tracking-wider">
                                Curious about Pilates reformer? This intro class teaches you the basics—from setup and
                                alignment to a guided beginner workout—designed to support and challenge any fitness level.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <p className="text-3xl font-bold text-brown-default">RESTORE+</p>
                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl
                bg-[url('/images/restore_plus.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl lg:opacity-0 opacity-75 transition duration-200 md:group-hover:opacity-90"></div>

                        <div className="text-main relative lg:hidden flex-col text-center transition duration-300 lg:group-hover:flex">

                            <p className="font-semibold leading-8 tracking-wider">
                                Need a nervous system reset? Want to find ease, mobility, and core control? These classes
                                soothe, restore, melt tension, and build mobility.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <p className="text-3xl font-bold text-brown-default">BURN+</p>

                    <div className="group relative flex min-h-96 w-70 flex-col items-center justify-center rounded-xl
                bg-[url('/images/burn_plus.jpg')] bg-cover bg-center bg-no-repeat p-3 transition-shadow duration-300 hover:shadow-2xl">
                        <div className="bg-brown-default absolute inset-0 rounded-xl lg:opacity-0 opacity-75 transition duration-200 md:group-hover:opacity-90"></div>
                        <div className="text-main relative lg:hidden flex-col text-center transition duration-300 md:group-hover:flex">
                            <p className="font-semibold leading-8 tracking-wider">
                                Craving that deep signature muscle burn? Want to work HARD and find your edge? These classes
                                incorporate more resistance, more pulses, more reps, and sequencing that will challenge your
                                body from head to toe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSection
