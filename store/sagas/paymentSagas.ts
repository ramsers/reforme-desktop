import { getProductList, postCreateCheckoutSession } from '@api/payment'
import { PayloadAction } from '@reduxjs/toolkit'
import { CreateCheckoutSessionPayload, Product } from '@reformetypes/paymentTypes'
import {
    createCheckoutSession,
    createCheckoutSessionSuccess,
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

export function* createCheckoutSessionSaga(action: PayloadAction<CreateCheckoutSessionPayload>) {
    console.log('HITTING DISPATCH =======', action.payload)
    try {
        const response: AxiosResponse<string> = yield call(postCreateCheckoutSession, action.payload)
        yield put(createCheckoutSessionSuccess(response.data))
        console.log('REsponse =============', response.data)
    } catch (e) {}
}

function* PaymentSagas() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga)
    yield takeLatest(createCheckoutSession.type, createCheckoutSessionSaga)
}

export default PaymentSagas
