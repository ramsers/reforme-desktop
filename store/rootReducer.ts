import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./slices/counterSlice"
import signUpSliceReducer from "@store/slices/signUpSlice"
import classSliceReducer from "@store/slices/classSlice"

const rootReducer = combineReducers({
    counter: counterReducer,
    signUp: signUpSliceReducer,
    class: classSliceReducer
})

export default rootReducer
