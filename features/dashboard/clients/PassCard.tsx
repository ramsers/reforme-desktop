'use client'

import React, { useState } from 'react'
import dayjs from 'dayjs'
import { PassPurchase } from '@reformetypes/paymentTypes'
import Button from '@components/button/button'
import { eRole } from '@reformetypes/authTypes'
import { useDispatch } from 'react-redux'
import { cancelSubscription } from '@store/slices/paymentSlice'
import Modal from '@components/modal/Modal'

type PassCardProps = {
    purchase: PassPurchase
    // userRole: eRole
}

const PassCard: React.FC<PassCardProps> = ({
    purchase,
    // userRole
}) => {
    const dispatch = useDispatch()

    const formattedDate = dayjs(purchase.endDate).format('D MMM YYYY')
    const statusColor = purchase.isActive ? 'text-green-600' : 'text-red-600'
    const statusLabel = purchase.isActive ? 'Active' : 'Expired'
    const dateLabel = purchase.isSubscription ? 'Renewal date:' : 'Expiration date:'
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCancel = () => {
        dispatch(cancelSubscription(purchase.id))
        setIsOpen(false)
    }

    console.log('TESTO =============', purchase.isCancelRequested)

    return (
        <>
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
                        <span className={`p-1 text-sm font-semibold ${statusColor}`}>{statusLabel}</span>

                        {purchase.isSubscription && (
                            <Button
                                variant="text"
                                text="Cancel"
                                onClick={() => setIsOpen(true)}
                                className="font-semibold text-red-600 hover:text-black"
                            />
                        )}

                        {/* {purchase.isSubscription && userRole === eRole.ADMIN ? (
                        <Button
                            variant="text"
                            text="Cancel"
                            onClick={handleCancel}
                            className="font-semibold text-red-600 hover:text-black"
                        />
                    ) : null} */}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Cancel your subscription"
                content={<p>Are you sure you want to cancel your subscription?</p>}
                onConfirm={() => handleCancel()}
                btnColor="bg"
            />
        </>
    )
}

export default PassCard
