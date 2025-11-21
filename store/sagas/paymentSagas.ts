import { getProductList, postCancelSubscription, postcreatePurchaseIntent } from '@api/payment'
import { PayloadAction } from '@reduxjs/toolkit'
import { CreatePurchaseIntentPayload, Product } from '@reformetypes/paymentTypes'
import {
    cancelSubscription,
    cancelSubscriptionSuccess,
    createPurchaseIntent,
    createPurchaseIntentSuccess,
    fetchProducts,
    fetchProductsSuccess,
    syncUserAfterPayment,
} from '@store/slices/paymentSlice'
import { fetchUserInfo } from '@store/slices/userSlice'
import { AxiosResponse } from 'axios'
import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { RootState } from '..'
import { toastError, toastLoading, toastSuccess } from 'lib/toast'

export function* waitForUserUpdateSaga() {
    for (let i = 0; i < 10; i++) {
        yield delay(1000)
        yield put(fetchUserInfo())
        const user = yield select((state: RootState) => state.user.currentUser)

        if (user?.purchases?.some((p) => p.isActive)) {
            return
        }
    }
    console.warn('No active pass after polling window.')
}

export function* fetchProductsSaga() {
    try {
        const response: AxiosResponse<Product[]> = yield call(getProductList)
        yield put(fetchProductsSuccess(response.data))
    } catch (e) {}
}

export function* createPurchaseIntentSaga(action: PayloadAction<CreatePurchaseIntentPayload>) {
    try {
        const response: AxiosResponse<string> = yield call(postcreatePurchaseIntent, action.payload)

        if (action.payload.isSubscription) {
            window.location.href = response.data
        } else {
            yield put(createPurchaseIntentSuccess(response.data))
        }
    } catch (e) {
        console.log('Error creating purchase intent:', e)
    }
}

export function* cancelSubscriptionSaga(action: PayloadAction<string>) {
    toastLoading('Canceling subscription...')

    try {
        yield call(postCancelSubscription, action.payload)
        yield put(cancelSubscriptionSuccess(action.payload))
        toastSuccess('Class created!')
    } catch (e) {
        toastError('Error creating class. Please try again.')
    }
}

function* PaymentSagas() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga)
    yield takeLatest(createPurchaseIntent.type, createPurchaseIntentSaga)
    yield takeLatest(syncUserAfterPayment.type, waitForUserUpdateSaga)
    yield takeLatest(cancelSubscription.type, cancelSubscriptionSaga)
}

export default PaymentSagas
