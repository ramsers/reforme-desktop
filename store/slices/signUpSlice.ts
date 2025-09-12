import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {eRole, SignUpPayload} from "@reformetypes/authTypes";

export type SignUpSliceType = {
    name: string | null
    email: string | null
    phoneNumber: string | null
    password: string | null
    role: eRole | null
}

const initialState: SignUpSliceType = {
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
    role: null
}

const signUpSlice = createSlice({
    name: 'signUpSlice',
    initialState: initialState,
    reducers: {
        signUp: (state, action: PayloadAction<SignUpPayload>) => {
            console.log('hittting acton =============')
            state.name = action.payload.name
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
            state.role = action.payload.role
        }
    }
})

export const { signUp } = signUpSlice.actions;
console.log('TEST =============', signUp)
export default signUpSlice.reducer
