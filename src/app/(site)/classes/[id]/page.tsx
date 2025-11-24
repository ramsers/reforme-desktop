'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Class } from '@reformetypes/classTypes'
import { Product } from '@reformetypes/paymentTypes'
import { RootState } from '@store/index'
import { fetchClass, removeClassBooking } from '@store/slices/classSlice'
import { fetchProducts } from '@store/slices/paymentSlice'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeModal from '@features/payments/StripeModal'
import { useRouter } from 'next/navigation'
import { createBooking, deleteUserBooking } from '@store/slices/bookingSlice'
import Button from '@components/button/button'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import SkeletonBlock from '@components/Loaders/SkeletonBlock'
import ProductList from '@features/classes/ProductList'

type ClassPageProps = {
    params: { id: string }
}

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
    const dispatch = useDispatch()
    const currentClass: AsyncResource<Class | null> = useSelector((state: RootState) => state.class.class)
    const productsList: Product[] = useSelector((state: RootState) => state.payment.products.data)
    const clientSecret = useSelector((state: RootState) => state.payment.clientSecret)
    const user = useSelector((state: RootState) => state.user.currentUser)
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userHasActivePass = !!user?.data?.purchases?.some((purchase) => purchase.isActive)

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

    const handleCreateBooking = (classId: string) => {
        dispatch(createBooking({ clientId: user?.data?.id!, classId: classId }))
    }

    const userBooking = currentClass?.data?.bookings?.find((bk: any) => bk.client?.id === user.data?.id)

    let isBooked = !!userBooking

    const bookingsCount = currentClass?.data?.bookingsCount ?? currentClass?.data?.bookings?.length ?? 0
    const classSize = currentClass?.data?.size ?? 0
    const isClassFull = currentClass?.data?.isFull ?? (!!classSize && bookingsCount >= classSize)
    const disableBooking = isClassFull && !isBooked

    const handlePassHolders = () => {
        if (isBooked) {
            user.data && dispatch(deleteUserBooking(userBooking?.id || ''))
            currentClass &&
                dispatch(
                    removeClassBooking({ classId: currentClass?.data?.id || '', bookingId: userBooking?.id || '' })
                )
        } else {
            currentClass && handleCreateBooking(currentClass?.data?.id || '')
        }
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
                            <p>
                                <span className="font-bold">Bookings:</span> {bookingsCount}/{classSize || '—'}
                            </p>
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
                            text={(disableBooking && 'Class full') || (isBooked && 'Cancel Booking') || 'Book now'}
                            onClick={() => handlePassHolders()}
                            className="w-56"
                            disabled={disableBooking}
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
