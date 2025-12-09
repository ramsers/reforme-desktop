'use client'

import ClientSettingsForm from '@features/dashboard/clients/ClientSettingsForm'
import PassCard from '@features/dashboard/clients/PassCard'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { RootState } from '@store/index'
import { retrieveUser } from '@store/slices/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'

const ClientPage: React.FC = () => {
    const disptach = useDispatch()
    const client = useSelector((state: RootState) => state.user.client)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        disptach(retrieveUser(id))
    }, [id])

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
                        <div className="flex flex-col gap-4">
                            {client?.purchases.map((purchase) => {
                                return <PassCard purchase={purchase} key={purchase.id} />
                            })}
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default ClientPage
