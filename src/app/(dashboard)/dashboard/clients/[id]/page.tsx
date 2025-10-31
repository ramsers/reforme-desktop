'use client'

import Modal from '@components/modal/Modal'
import SlidingModal from '@components/slidingModal/SlidingModal'
import ClientSettingsForm from '@features/dashboard/clients/ClientSettingsForm'
import PassCard from '@features/dashboard/clients/PassCard'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Booking } from '@reformetypes/bookingTypes'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import { retrieveUser } from '@store/slices/userSlice'
import dayjs from 'dayjs'
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ClientPageProps = {
    params: { id: string }
}

const ClientPage: React.FC<ClientPageProps> = ({ params }) => {
    const disptach = useDispatch()
    const client = useSelector((state: RootState) => state.user.client)
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
                            return <PassCard purchase={purchase} />
                        })}
                    </TabPanel>
                    <TabPanel>Content 3</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default ClientPage
