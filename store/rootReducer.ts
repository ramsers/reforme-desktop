import { combineReducers } from "@reduxjs/toolkit"
import signUpSliceReducer from "@store/slices/signUpSlice"
import classSliceReducer from "@store/slices/classSlice"
import userSliceReducer from "@store/slices/userSlice"
import bookingSliceReducer from "@store/slices/bookingSlice"

const rootReducer = combineReducers({
    signUp: signUpSliceReducer,
    class: classSliceReducer,
    user: userSliceReducer,
    booking: bookingSliceReducer
})

export default rootReducer
