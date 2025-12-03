'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/index'
import Button from '@components/button/button'
import { formatCurrency } from 'utils/currencyUtils'
import { Product } from '@reformetypes/paymentTypes'
import { createPurchaseIntent, fetchProducts } from '@store/slices/paymentSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import SkeletonBlock from '@components/Loaders/SkeletonBlock'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { User } from '@reformetypes/userTypes'

const ProductList: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const productsList: AsyncResource<Product[]> = useSelector((state: RootState) => state.payment.products)
    const user: AsyncResource<User | null> = useSelector((state: RootState) => state.user.currentUser)
    const userHasActivePass = !!user.data?.purchases?.some((purchase) => purchase.isActive)

    useEffect(() => {
        if (!productsList.hasFetched && !productsList.fetching) {
            dispatch(fetchProducts())
        }
    }, [dispatch, productsList.hasFetched, productsList.fetching])

    const handlePurchaseClick = (product: Product) => {
        const currentPath = window.location.href

        if (user.data && !userHasActivePass) {
            console.log('im beimg called')

            dispatch(
                createPurchaseIntent({
                    priceId: product.priceId,
                    productName: product.name,
                    isSubscription: product.isSubscription,
                    currency: product.currency,
                    priceAmount: product.priceAmount,
                    durationDays: product.durationDays,
                    redirectUrl: product.isSubscription ? currentPath : null,
                })
            )
        } else {
            router.push(`${AppRoutes.authenticate.signUp}?redirect=${encodeURIComponent(currentPath)}`)
        }
    }

    return (
        <div className="flex w-3/4 flex-col justify-center gap-3 lg:flex-row">
            {!productsList || !productsList.hasFetched ? (
                <SkeletonBlock className="w-1/2" rows={1} />
            ) : (
                <>
                    {productsList.data.map((product) => (
                        <div key={product.id} className="w-full rounded-xl border border-gray-200 bg-white p-3 shadow">
                            <div className="flex h-full w-full flex-col justify-between gap-3">
                                <div className="flex flex-col gap-1">
                                    <div className="text-lg font-bold">{product.name}</div>
                                    <div className="flex flex-row items-center justify-between gap-2">
                                        <div className="text-sm text-gray-600">{product.description}</div>
                                        <p className="text-sm font-bold">{formatCurrency(product.priceAmount)}</p>
                                    </div>
                                </div>

                                <Button
                                    text={user.data && !userHasActivePass ? 'Purchase pass' : 'Create account'}
                                    onClick={() => handlePurchaseClick(product)}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default ProductList
