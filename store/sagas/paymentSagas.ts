import { getProductList, postcreatePurchaseIntent } from '@api/payment'
import { PayloadAction } from '@reduxjs/toolkit'
import { CreatePurchaseIntentPayload, Product } from '@reformetypes/paymentTypes'
import {
    createPurchaseIntent,
    createPurchaseIntentSuccess,
    fetchProducts,
    fetchProductsSuccess,
} from '@store/slices/paymentSlice'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

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
    } catch (e) {}
}

function* PaymentSagas() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga)
    yield takeLatest(createPurchaseIntent.type, createPurchaseIntentSaga)
}

export default PaymentSagas
