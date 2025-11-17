import { AccessTokenResponse, ForgotPasswordPayload, LoginPayload, SignUp } from '@reformetypes/authTypes'
import { AxiosResponse } from 'axios'
import apiClient from '../config/axios.config'
import APIRoutes from '../config/reformeApiRoutes'

export const postSignUp = (signUpData: SignUp): Promise<AxiosResponse<AccessTokenResponse>> => {
    return apiClient.post(APIRoutes.AUTH.SIGN_UP, signUpData)
}

export const postLogin = (loginData: LoginPayload): Promise<AxiosResponse<AccessTokenResponse>> => {
    return apiClient.post(APIRoutes.AUTH.LOGIN, loginData)
}

export const postForgotPassword = (data: ForgotPasswordPayload): Promise<AxiosResponse<void>> => {
    console.log('Datae ==============', data)
    return apiClient.post(APIRoutes.AUTH.FORGOT_PASSWORD, data)
}
