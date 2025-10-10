'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { DivideIcon } from '@heroicons/react/24/solid'
import { Class } from '@reformetypes/classTypes'
import { Product } from '@reformetypes/paymentTypes'
import { RootState } from '@store/index'
import { fetchClass } from '@store/slices/classSlice'
import { createPurchaseIntent, fetchProducts } from '@store/slices/paymentSlice'
import dayjs from 'dayjs'
import { stat } from 'fs'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from 'utils/currencyUtils'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import Modal from '@components/modal/Modal'
import { Transition } from '@headlessui/react'
import StripeModal from '@features/payments/StripeModal'

type ClassPageProps = {
    params: { id: string }
}
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
    const dispatch = useDispatch()
    const currentClass: Class | null = useSelector((state: RootState) => state.class.class)
    const productsList: Product[] = useSelector((state: RootState) => state.payment.products)
    const clientSecret = useSelector((state: RootState) => state.payment.clientSecret)

    const [isModalOpen, setIsModalOpen] = useState(false)

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
        console.log('PRODUCT ===============', product)
        dispatch(
            createPurchaseIntent({
                priceId: product.priceId,
                productName: product.name,
                isSubscription: product.isSubscription,
                currency: product.currency,
                priceAmount: product.priceAmount,
            })
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex max-w-[60%] flex-row items-center gap-3">
                <div className="flex w-[50%] flex-col gap-2">
                    <h2 className="text-4xl font-semibold">{currentClass?.title || null}</h2>
                    <p>{(currentClass?.date && dayjs(currentClass.date).format('dddd MMMM D YYYY h:mm A')) || ''}</p>
                    <p>{currentClass?.description}</p>
                </div>
                <div className="flex w-[50%] flex-col gap-2">
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

            {productsList.map((product) => {
                return (
                    <div key={product.id} className="w-84 rounded-xl border border-gray-200 bg-white p-3 shadow">
                        <div className="flex w-full flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold">{product.name}</div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <div className="text-sm text-gray-600">{product.description}</div>
                                    <p className="text-sm font-bold">{formatCurrency(product.priceAmount)}</p>
                                </div>
                            </div>
                            <button
                                onClick={
                                    () => handleClick(product)
                                    // console.log('YO clicked =========')
                                }
                                className="hover:bg-gray-10 hover:text-brown-default bg-brown-default text-main cursor-pointer rounded-lg px-3 py-1 font-semibold transition-colors"
                            >
                                Book now
                            </button>
                        </div>
                    </div>
                )
            })}
            {clientSecret && (
                <StripeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientSecret={clientSecret} />
            )}
            {/* <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Complete your booking"
                content={<div ref={checkoutRef} id="checkout-element" className="min-h-[500px]" />}
            /> */}

            {/* <Transition
                appear
                show={isModalOpen}
                as={Fragment}
                afterEnter={() => {
                    if (!clientSecret || !checkoutRef.current) return
                    ;(stripePromise as any).then((stripe) => {
                        if (!stripe) return
                        stripe.initCheckout({ clientSecret, element: checkoutRef.current })
                    })
                }}
            ></Transition> */}
        </div>
    )
}

export default ClassPage
