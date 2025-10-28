'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Class } from '@reformetypes/classTypes'
import { Product } from '@reformetypes/paymentTypes'
import { RootState } from '@store/index'
import { fetchClass, removeClassBooking } from '@store/slices/classSlice'
import { createPurchaseIntent, fetchProducts } from '@store/slices/paymentSlice'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from 'utils/currencyUtils'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import StripeModal from '@features/payments/StripeModal'
import { useRouter } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import { createBooking, deleteUserBooking } from '@store/slices/bookingSlice'
import Button from '@components/button/button'

type ClassPageProps = {
    params: { id: string }
}

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
    const dispatch = useDispatch()
    const currentClass: Class | null = useSelector((state: RootState) => state.class.class)
    const productsList: Product[] = useSelector((state: RootState) => state.payment.products)
    const clientSecret = useSelector((state: RootState) => state.payment.clientSecret)
    const user = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userHasActivePass = !!user?.currentUser?.purchases?.some((purchase) => purchase.isActive)
    console.log('ACTIVE ==============', user?.currentUser)

    useEffect(() => {
        if (!currentClass) {
            dispatch(fetchClass(params.id))
        }

        if (productsList.length === 0) {
            dispatch(fetchProducts())
        }
    }, [currentClass])

    useEffect(() => {
        if (!clientSecret) return
        setIsModalOpen(true)
    }, [clientSecret])

    const handleClick = (product: Product) => {
        dispatch(
            createPurchaseIntent({
                priceId: product.priceId,
                productName: product.name,
                isSubscription: product.isSubscription,
                currency: product.currency,
                priceAmount: product.priceAmount,
                durationDays: product.durationDays,
            })
        )
    }

    const handleCreateBooking = (classId: string) => {
        dispatch(createBooking({ clientId: user?.currentUser?.id!, classId: classId }))
    }

    const userBooking = currentClass?.bookings?.find((bk: any) => bk.client?.id === user.currentUser?.id)

    let isBooked = !!userBooking

    const handlePassHolders = () => {
        if (isBooked) {
            user.currentUser && dispatch(deleteUserBooking(userBooking?.id || ''))
            currentClass && dispatch(removeClassBooking({ classId: currentClass.id, bookingId: userBooking?.id || '' }))
        } else {
            currentClass && handleCreateBooking(currentClass.id)
        }
    }

    const handlePassClick = (product: Product) => {
        const currentPath = window.location.pathname

        !!user.currentUser && !userHasActivePass
            ? handleClick(product)
            : router.push(`${AppRoutes.authenticate.signUp}?redirect=${encodeURIComponent(currentPath)}`)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-col gap-3 lg:max-w-[60%] lg:flex-row lg:items-center">
                <div className="flex flex-col gap-2 lg:w-[50%]">
                    <h2 className="text-4xl font-semibold">{currentClass?.title || null}</h2>
                    <p>{(currentClass?.date && dayjs(currentClass.date).format('dddd MMMM D YYYY h:mm A')) || ''}</p>
                    <p>{currentClass?.description}</p>
                </div>
                <div className="flex flex-col gap-2 lg:w-[50%]">
                    <UserCircleIcon className="text-brown-default h-24 w-24" />
                    <p>
                        <span className="font-bold">Instructor name:</span>{' '}
                        {currentClass?.instructor?.name || 'No instructor assigned'}
                    </p>
                    <p>
                        <span className="font-bold">Bio:</span> This should actually be something like a part of an
                        instructor bio which is a separate table/model holding data specific to the instructors like
                    </p>
                </div>
            </div>

            {(userHasActivePass && (
                <Button
                    variant={(isBooked && 'danger') || 'default'}
                    text={(isBooked && 'Cancel Booking') || 'Book now'}
                    onClick={() => handlePassHolders()}
                    className="w-56"
                />
            )) || (
                <div className="flex flex-col gap-3 lg:flex-row">
                    {productsList.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="w-full rounded-xl border border-gray-200 bg-white p-3 shadow"
                            >
                                <div className="flex h-full w-full flex-col justify-between gap-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-lg font-bold">{product.name}</div>
                                        <div className="flex flex-row items-center justify-between gap-2">
                                            <div className="text-sm text-gray-600">{product.description}</div>
                                            <p className="text-sm font-bold">{formatCurrency(product.priceAmount)}</p>
                                        </div>
                                    </div>
                                    <Button
                                        text={
                                            !!user.currentUser && !userHasActivePass
                                                ? 'Purchase pass'
                                                : 'Create account'
                                        }
                                        onClick={() => handlePassClick(product)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {clientSecret && (
                <StripeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientSecret={clientSecret} />
            )}
        </div>
    )
}

export default ClassPage
