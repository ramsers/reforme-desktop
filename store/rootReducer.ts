import { combineReducers } from "@reduxjs/toolkit"
import signUpSliceReducer from "@store/slices/signUpSlice"
import classSliceReducer from "@store/slices/classSlice"
import userSliceReducer from "@store/slices/userSlice"

const rootReducer = combineReducers({
    signUp: signUpSliceReducer,
    class: classSliceReducer,
    user: userSliceReducer
})

export default rootReducer
