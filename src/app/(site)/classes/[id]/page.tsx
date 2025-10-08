'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Class } from '@reformetypes/classTypes'
import { Product } from '@reformetypes/paymentTypes'
import { RootState } from '@store/index'
import { fetchClass } from '@store/slices/classSlice'
import { fetchProducts } from '@store/slices/paymentSlice'
import dayjs from 'dayjs'
import { stat } from 'fs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ClassPageProps = {
    params: { id: string }
}

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
    const dispatch = useDispatch()
    const currentClass: Class | null = useSelector((state: RootState) => state.class.class)
    const productsList: Product[] = useSelector((state: RootState) => state.payment.products)

    useEffect(() => {
        if (!currentClass) {
            dispatch(fetchClass(params.id))
        }

        if (!productsList.length) {
            dispatch(fetchProducts())
        }
    }, [currentClass])
    console.log('HI im on classes page ============', currentClass)
    console.log('HI products ============', productsList)

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
        </div>
    )
}

export default ClassPage
