import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { CreatePurchaseIntentPayload, Product } from '@reformetypes/paymentTypes'

export type PaymentSliceType = {
    clientSecret: string | null
    products: AsyncResource<Product[]>
}

const initialState: PaymentSliceType = {
    clientSecret: null,
    products: { fetching: false, hasFetched: false, data: [] },
}

const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState: initialState,
    reducers: {
        fetchProducts: (state) => {
            state.products.fetching = true
            return state
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products.fetching = false
            state.products.hasFetched = true

            console.log('ACTION ====================', action.payload)
            state.products.data = action.payload
            return state
        },
        createPurchaseIntent: (state, action: PayloadAction<CreatePurchaseIntentPayload>) => state,
        createPurchaseIntentSuccess: (state, action: PayloadAction<string>) => {
            state.clientSecret = action.payload

            return state
        },
        syncUserAfterPayment: (state) => state,
        cancelSubscription: (state, action: PayloadAction<string>) => state,
        cancelSubscriptionSuccess: (state, action: PayloadAction<string>) => state,
    },
})

export const {
    fetchProducts,
    fetchProductsSuccess,
    createPurchaseIntent,
    createPurchaseIntentSuccess,
    syncUserAfterPayment,
    cancelSubscription,
    cancelSubscriptionSuccess,
} = paymentSlice.actions
export default paymentSlice.reducer
