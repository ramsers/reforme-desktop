'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Class } from '@reformetypes/classTypes'
import { Product } from '@reformetypes/paymentTypes'
import { RootState } from '@store/index'
import { fetchClass, removeClassBooking } from '@store/slices/classSlice'
import { createPurchaseIntent, fetchProducts } from '@store/slices/paymentSlice'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from 'utils/currencyUtils'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import StripeModal from '@features/payments/StripeModal'
import { useRouter } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import { createBooking, deleteUserBooking } from '@store/slices/bookingSlice'
import Button from '@components/button/button'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import SkeletonBlock from '@components/SkeletonBlock/SkeletonBlock'
import ProductList from '@features/classes/ProductList'

type ClassPageProps = {
    params: { id: string }
}

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
    const dispatch = useDispatch()
    const currentClass: AsyncResource<Class | null> = useSelector((state: RootState) => state.class.class)
    const productsList: Product[] = useSelector((state: RootState) => state.payment.products)
    const clientSecret = useSelector((state: RootState) => state.payment.clientSecret)
    const user = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userHasActivePass = !!user?.currentUser?.purchases?.some((purchase) => purchase.isActive)

    useEffect(() => {
        if (!currentClass.data && !currentClass.hasFetched) {
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

    const userBooking = currentClass?.data?.bookings?.find((bk: any) => bk.client?.id === user.currentUser?.id)

    let isBooked = !!userBooking

    const handlePassHolders = () => {
        if (isBooked) {
            user.currentUser && dispatch(deleteUserBooking(userBooking?.id || ''))
            currentClass &&
                dispatch(
                    removeClassBooking({ classId: currentClass?.data?.id || '', bookingId: userBooking?.id || '' })
                )
        } else {
            currentClass && handleCreateBooking(currentClass?.data?.id || '')
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
            {!currentClass || !currentClass.hasFetched ? (
                <div className="w-full max-w-2xl p-4">
                    <SkeletonBlock rows={3} />
                </div>
            ) : (
                <>
                    <div className="flex w-full flex-col gap-3 lg:max-w-[60%] lg:flex-row lg:items-center">
                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <h2 className="text-4xl font-semibold">{currentClass?.data?.title || null}</h2>
                            <p>
                                {(currentClass?.data?.date &&
                                    dayjs(currentClass?.data?.date).format('dddd MMMM D YYYY h:mm A')) ||
                                    ''}
                            </p>
                            <p>{currentClass.data?.description}</p>
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <UserCircleIcon className="text-brown-default h-24 w-24" />
                            <p>
                                <span className="font-bold">Instructor name:</span>{' '}
                                {currentClass?.data?.instructor?.name || 'No instructor assigned'}
                            </p>
                            <p>
                                <span className="font-bold">Bio:</span> This should actually be something like a part of
                                an instructor bio which is a separate table/model holding data specific to the
                                instructors like
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
                    )) || <ProductList />}
                </>
            )}
            {clientSecret && (
                <StripeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientSecret={clientSecret} />
            )}
        </div>
    )
}

export default ClassPage
