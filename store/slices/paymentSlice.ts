import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreatePurchaseIntentPayload, Product, PurchaseIntentResponse } from '@reformetypes/paymentTypes'
import { stat } from 'fs'

export type PaymentSliceType = {
    clientSecret: string | null
    products: Product[]
}

const initialState: PaymentSliceType = {
    clientSecret: null,
    products: [],
}

const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState: initialState,
    reducers: {
        fetchProducts: (state) => state,
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
            return state
        },
        createPurchaseIntent: (state, action: PayloadAction<CreatePurchaseIntentPayload>) => state,
        createPurchaseIntentSuccess: (state, action: PayloadAction<string>) => {
            state.clientSecret = action.payload

            return state
        },
        syncUserAfterPayment: (state) => state,
    },
})

export const {
    fetchProducts,
    fetchProductsSuccess,
    createPurchaseIntent,
    createPurchaseIntentSuccess,
    syncUserAfterPayment,
} = paymentSlice.actions
export default paymentSlice.reducer
