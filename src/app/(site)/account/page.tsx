'use client'
import ProfileSettingsForm from '@features/settings/ProfileSettingsForm'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import React from 'react'
import { useSelector } from 'react-redux'

const AccountPage: React.FC = () => {
    const currentUser: User | null = useSelector((state: RootState) => state.user?.currentUser || null)

    console.log('INA DE BOG =================', currentUser)

    return (
        <TabGroup className={'flex flex-col gap-6'}>
            <TabList className={'flex flex-row gap-5 border-b-2 font-semibold ' + 'border-brown-default max-w-[30vw]'}>
                <Tab className={'data-selected:bg-brown-default/40 rounded-t-md px-3 py-1.5 focus:outline-none'}>
                    Personal info
                </Tab>
                <Tab className={'data-selected:bg-brown-default/40 rounded-t-md px-3 py-1.5 focus:outline-none'}>
                    Pass/Subscription Info
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ProfileSettingsForm />
                </TabPanel>
                <TabPanel className="flex flex-col gap-4">
                    {currentUser?.purchases.map((purchase) => {
                        return <div className="border-brown-default max-w-96 rounded-lg border p-2">itsa producta</div>
                    })}
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default AccountPage
