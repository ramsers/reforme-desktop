import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./slices/counterSlice"
import signUpSliceReducer from "@store/slices/signUpSlice"

const rootReducer = combineReducers({
    counter: counterReducer,
    signUp: signUpSliceReducer
})

export default rootReducer
