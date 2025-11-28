import { combineReducers } from '@reduxjs/toolkit'
import authSliceReducer from '@store/slices/authSlice'
import classSliceReducer from '@store/slices/classSlice'
import userSliceReducer from '@store/slices/userSlice'
import bookingSliceReducer from '@store/slices/bookingSlice'
import paymentSliceReducer from '@store/slices/paymentSlice'

const rootReducer = combineReducers({
    signUp: authSliceReducer,
    class: classSliceReducer,
    user: userSliceReducer,
    booking: bookingSliceReducer,
    payment: paymentSliceReducer,
})

export default rootReducer
