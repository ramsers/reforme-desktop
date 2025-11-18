import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, SignUpPayload, ForgotPasswordPayload, ResetPasswordPayload } from '@reformetypes/authTypes'

export type AuthSliceType = {}

const initialState: AuthSliceType = {}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        signUp: (state, action: PayloadAction<SignUpPayload>) => state,
        login: (state, action: PayloadAction<LoginPayload>) => state,
        logout: (state) => state,
        forgotPassword: (state, action: PayloadAction<ForgotPasswordPayload>) => state,
        resetPassword: (state, action: PayloadAction<ResetPasswordPayload>) => state,
    },
})

export const { signUp, login, logout, forgotPassword, resetPassword } = authSlice.actions
export default authSlice.reducer
