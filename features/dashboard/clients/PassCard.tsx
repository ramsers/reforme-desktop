'use client'

import React from 'react'
import dayjs from 'dayjs'
import { PassPurchase } from '@reformetypes/paymentTypes'
import Button from '@components/button/button'

type PassCardProps = {
    purchase: PassPurchase
    onCancel?: (purchaseId: string) => void
}

const PassCard: React.FC<PassCardProps> = ({ purchase, onCancel }) => {
    const handleCancel = () => {
        if (onCancel) onCancel(purchase.stripeProductId)
    }

    const formattedDate = dayjs(purchase.endDate).format('D MMM YYYY')
    const statusColor = purchase.isActive ? 'text-green-600' : 'text-red-600'
    const statusLabel = purchase.isActive ? 'Active' : 'Expired'
    const dateLabel = purchase.isSubscription ? 'Renewal date:' : 'Expiration date:'

    return (
        <div className="border-brown-default max-w-96 rounded-lg border bg-white p-3 shadow-md shadow-sm transition">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col justify-between">
                    <p className="text-xl font-semibold">{purchase.passName}</p>
                    <p className="text-sm text-gray-700">
                        <span className="mr-1 font-semibold">{dateLabel}</span>
                        {formattedDate}
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-right">
                    <p className={`font-semibold ${statusColor}`}>{statusLabel}</p>

                    {purchase.isSubscription && (
                        <Button
                            variant="text"
                            text="Cancel"
                            onClick={handleCancel}
                            className="font-semibold text-red-600 hover:text-black"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PassCard
