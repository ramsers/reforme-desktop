import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@reformetypes/paymentTypes'

export type PaymentSliceType = {
    products: Product[]
}

const initialState: PaymentSliceType = {
    products: [],
}

const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState: initialState,
    reducers: {
        fetchProducts: (state) => state,
    },
})

export const { fetchProducts } = paymentSlice.actions
export default paymentSlice.reducer
