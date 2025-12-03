'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PassCard from '@features/dashboard/clients/PassCard'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import ProductList from '@features/payments/ProductList'
import StripeModal from './StripeModal'

const PassesSection: React.FC = () => {
    const clientSecret = useSelector((state: RootState) => state.payment.clientSecret)
    const currentUser: AsyncResource<User | null> = useSelector((state: RootState) => state.user?.currentUser)
    const purchases = currentUser.data?.purchases ?? []
    const hasPurchases = purchases.length > 0
    const userHasActivePass = !!currentUser?.data?.purchases?.some((purchase) => purchase.isActive)

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (!clientSecret) return

        setIsModalOpen(true)
    }, [clientSecret])

    return (
        <div className="flex flex-col gap-4">
            {userHasActivePass ? (
                purchases.map((purchase) => purchase.isActive && <PassCard purchase={purchase} key={purchase.id} />)
            ) : (
                <div className="flex flex-col gap-6">
                    <p>No current passes</p>
                    <div className="flex justify-start">
                        <ProductList />
                    </div>
                </div>
            )}
            {clientSecret && (
                <StripeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientSecret={clientSecret} />
            )}
        </div>
    )
}

export default PassesSection
