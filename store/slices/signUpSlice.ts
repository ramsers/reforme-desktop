import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {eRole, LoginPayload, SignUpPayload} from "@reformetypes/authTypes";

export type SignUpSliceType = {}

const initialState: SignUpSliceType = {}

const signUpSlice = createSlice({
    name: 'signUpSlice',
    initialState: initialState,
    reducers: {
        signUp: (state, action: PayloadAction<SignUpPayload>) => state,
        login: (state, action: PayloadAction<LoginPayload>) => state,
        logout: (state) => state
    }
})

export const { signUp, login, logout } = signUpSlice.actions;
export default signUpSlice.reducer
