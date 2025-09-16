import {PayloadAction} from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from 'axios'
import {AccessTokenResponse, LoginPayload, SignUpPayload} from "@reformetypes/authTypes";
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {postLogin, postSignUp} from "@api/auth";
import signUpSlice from "@store/slices/signUpSlice";
import {signUp, login, logout} from "@store/slices/signUpSlice"
import {connectApi} from "../../config/axios.config";
import {fetchUserSuccess} from "@store/slices/userSlice"
import AppRoutes from "../../config/appRoutes";
import {reset} from "@store/slices/userSlice"


export function* setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
}


export function* signUpSaga(action: PayloadAction<SignUpPayload>) {
    try {
        // console.log('HITTTING SAGA =============')
        const response: AxiosResponse<AccessTokenResponse> = yield call(postSignUp, {
            name: action.payload.name,
            email: action.payload.email,
            phoneNumber: action.payload.phoneNumber,
            password: action.payload.password,
            role: action.payload.role
        })
        yield call(setAccessToken, response.data.access)
        yield call(connectApi)
        yield put(fetchUserSuccess(response.data.user))
        // console.log('HITTTING SAGA =============', response)
        if (action.payload.onSuccess) {
            yield call(action.payload.onSuccess())
        }

    } catch (e) {

    }
}

export function* loginSaga(action: PayloadAction<LoginPayload>) {
    console.log('HITTTING loginSaga =============', action.payload)
    try {
          const response: AxiosResponse<AccessTokenResponse> = yield call(postLogin, action.payload)
        console.log('HITTTING xloginSaga =============', response.data)

        yield call(setAccessToken, response.data.access)
        yield call(connectApi)
        yield put(fetchUserSuccess(response.data.user))

        if (action.payload.onSuccess) {
            yield call(action.payload.onSuccess())
        }
    } catch (e) {

    }
}

export function* logoutSaga() {
    try {
        localStorage.removeItem("accessToken");
        yield put(reset())
    } catch (e) {

    }
}

function* signUpFormSaga() {
    yield takeLatest(signUp.type, signUpSaga)
    yield takeLatest(login.type, loginSaga)
    yield takeLatest(logout.type, logoutSaga)
}

export default signUpFormSaga
