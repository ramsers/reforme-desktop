import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateCheckoutSessionPayload, Product } from '@reformetypes/paymentTypes'
import { stat } from 'fs'

export type PaymentSliceType = {
    sessionId: string | null
    products: Product[]
}

const initialState: PaymentSliceType = {
    sessionId: null,
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
        createCheckoutSession: (state, action: PayloadAction<CreateCheckoutSessionPayload>) => state,
        createCheckoutSessionSuccess: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload
            return state
        },
    },
})

export const { fetchProducts, fetchProductsSuccess, createCheckoutSession, createCheckoutSessionSuccess } =
    paymentSlice.actions
export default paymentSlice.reducer
