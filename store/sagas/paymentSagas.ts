import { getProductList } from '@api/payment'
import { Product } from '@reformetypes/paymentTypes'
import { fetchProducts } from '@store/slices/paymentSlice'
import { AxiosResponse } from 'axios'
import { call, takeLatest } from 'redux-saga/effects'

export function* fetchProductsSaga() {
    try {
        const response: AxiosResponse<Product[]> = yield call(getProductList)

        console.log('RESPONSE ============', response)
    } catch (e) {}
}

function* PaymentSagas() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga)
}

export default PaymentSagas
