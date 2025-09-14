import {PayloadAction} from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from 'axios'
import {AccessTokenResponse, LoginPayload, SignUpPayload} from "@reformetypes/authTypes";
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {postLogin, postSignUp} from "@api/auth";
import signUpSlice from "@store/slices/signUpSlice";
import {signUp, login} from "@store/slices/signUpSlice"

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
        // console.log('HITTTING SAGA =============', response)

    } catch (e) {

    }
}

export function* loginSaga(action: PayloadAction<LoginPayload>) {
    console.log('HITTTING loginSaga =============', action.payload)
    try {
          const response: AxiosResponse<AccessTokenResponse> = yield call(postLogin, action.payload)
        console.log('HITTTING xloginSaga =============', response)

    } catch (e) {

      }
}

function* signUpFormSaga() {
    yield takeLatest(signUp.type, signUpSaga)
    yield takeLatest(login.type, loginSaga)
}

export default signUpFormSaga
