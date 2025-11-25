import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import {
    AccessTokenResponse,
    ForgotPasswordPayload,
    LoginPayload,
    ResetPasswordPayload,
    SignUpPayload,
} from '@reformetypes/authTypes'
import { call, put, takeLatest } from 'redux-saga/effects'
import { postForgotPassword, postLogin, postResetPassword, postSignUp } from '@api/auth'
import { forgotPassword, login, logout, resetPassword, signUp } from '@store/slices/authSlice'
import { connectApi } from '../../config/axios.config'
import { fetchUserInfoSuccess, reset } from '@store/slices/userSlice'
import { toastError, toastLoading, toastSuccess } from 'lib/toast'
import { extractApiError } from 'utils/apiUtils'

export function* setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
}

export function* signUpSaga(action: PayloadAction<SignUpPayload>) {
    try {
        const response: AxiosResponse<AccessTokenResponse> = yield call(postSignUp, {
            name: action.payload.name,
            email: action.payload.email,
            phoneNumber: action.payload.phoneNumber,
            password: action.payload.password,
            role: action.payload.role,
        })
        yield call(setAccessToken, response.data.access)
        yield call(connectApi)
        yield put(fetchUserInfoSuccess(response.data.user))

        if (action.payload.onSuccess) {
            yield call(action.payload.onSuccess)
        }
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* loginSaga(action: PayloadAction<LoginPayload>) {
    try {
        const response: AxiosResponse<AccessTokenResponse> = yield call(postLogin, action.payload)

        yield call(setAccessToken, response.data.access)
        yield call(connectApi)
        yield put(fetchUserInfoSuccess(response.data.user))
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* logoutSaga() {
    try {
        localStorage.removeItem('accessToken')
        yield put(reset())
    } catch (e) {}
}

export function* forgotPasswordSaga(action: PayloadAction<ForgotPasswordPayload>) {
    toastLoading('Sending email if it exists...')
    try {
        yield call(postForgotPassword, action.payload)
        toastSuccess('If this email exists, an email link will be sent')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* resetPasswordSaga(action: PayloadAction<ResetPasswordPayload>) {
    toastLoading('Updating our system...')

    try {
        yield call(postResetPassword, action.payload)
        toastSuccess('Password succesfully updated')

        if (action.payload.onSuccess) {
            yield call(action.payload.onSuccess)
        }
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

function* authSagas() {
    yield takeLatest(signUp.type, signUpSaga)
    yield takeLatest(login.type, loginSaga)
    yield takeLatest(logout.type, logoutSaga)
    yield takeLatest(forgotPassword.type, forgotPasswordSaga)
    yield takeLatest(resetPassword.type, resetPasswordSaga)
}

export default authSagas
