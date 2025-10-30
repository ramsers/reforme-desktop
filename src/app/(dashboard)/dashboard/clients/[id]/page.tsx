'use client'

import SlidingModal from '@components/slidingModal/SlidingModal'
import ClientSettingsForm from '@features/dashboard/clients/ClientSettingsForm'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Booking } from '@reformetypes/bookingTypes'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import { retrieveUser } from '@store/slices/userSlice'
import dayjs from 'dayjs'
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ClientPageProps = {
    params: { id: string }
}

const ClientPage: React.FC<ClientPageProps> = ({ params }) => {
    const disptach = useDispatch()
    const client = useSelector((state: RootState) => state.user.client)

    useEffect(() => {
        disptach(retrieveUser(params.id))
    }, [params.id])

    return (
        <div>
            <TabGroup className={'flex flex-col gap-6'}>
                <TabList
                    className={'flex flex-row gap-5 border-b-2 font-semibold ' + 'border-brown-default lg:max-w-[30vw]'}
                >
                    <Tab
                        className={
                            'data-selected:bg-brown-default/40 w-[50%] rounded-t-md px-3 py-1.5 focus:outline-none'
                        }
                    >
                        Account info
                    </Tab>
                    <Tab
                        className={
                            'data-selected:bg-brown-default/40 w-[50%] rounded-t-md px-3 py-1.5 focus:outline-none'
                        }
                    >
                        Payment Info
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>{client && <ClientSettingsForm client={client} />}</TabPanel>
                    <TabPanel>
                        {client?.purchases.map((purchase) => {
                            console.log('PURCHASE ===============', purchase)
                            return (
                                <div className="border-brown-default max-w-96 rounded-lg border p-2">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col justify-between">
                                            <p className="text-xl font-semibold">{purchase.passName}</p>
                                            <p className="text-sm">
                                                <span className="mr-1 font-semibold">
                                                    {(purchase.isSubscription && 'Renewal') || 'Expiration'} date:
                                                </span>
                                                {dayjs(purchase.endDate).format('D MMM YYYY')}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {(purchase.isActive && (
                                                <p className="font-semibold text-green-600">Active</p>
                                            )) || <p className="font-semibold text-red-600">Expired</p>}
                                            {purchase.isSubscription && (
                                                <p className="cursor-pointer font-semibold text-red-600 hover:text-black">
                                                    Cancel
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel>Content 3</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default ClientPage
