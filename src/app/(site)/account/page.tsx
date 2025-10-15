'use client'
import ProfileSettingsForm from '@features/settings/ProfileSettingsForm'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import dayjs from 'dayjs'
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
            </TabPanels>
        </TabGroup>
    )
}

export default AccountPage
