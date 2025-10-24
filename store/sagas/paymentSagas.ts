import { getProductList, postcreatePurchaseIntent } from '@api/payment'
import { PayloadAction } from '@reduxjs/toolkit'
import { CreatePurchaseIntentPayload, Product } from '@reformetypes/paymentTypes'
import {
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

export function* waitForUserUpdateSaga() {
    console.log('being called =================')
    for (let i = 0; i < 10; i++) {
        console.log('BEING CALLEC IN LOOP WTF ====================')
        yield delay(1000)
        yield put(fetchUserInfo())
        const user = yield select((state: RootState) => state.user.currentUser)

        if (user?.purchases?.some((p) => p.isActive)) {
            console.log('✅ User pass activated!')
            return
        }
    }
    console.warn('⚠️ No active pass after polling window.')
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

function* PaymentSagas() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga)
    yield takeLatest(createPurchaseIntent.type, createPurchaseIntentSaga)
    yield takeLatest(syncUserAfterPayment.type, waitForUserUpdateSaga)

    // waitForUserUpdateSaga
}

export default PaymentSagas
