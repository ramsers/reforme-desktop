import {AccessTokenResponse, LoginPayload, SignUp} from "@reformetypes/authTypes";
import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes"

export const postSignUp = (signUpData: SignUp): Promise<AxiosResponse<AccessTokenResponse>> => {
    console.log('SIGNUP DATA ============', signUpData)
    return apiClient.post(APIRoutes.AUTH.SIGN_UP, signUpData)
}

export const postLogin = (loginData: LoginPayload): Promise<AxiosResponse<AccessTokenResponse>> => {
    console.log('SIGNUP DATA ============', loginData)
    return apiClient.post(APIRoutes.AUTH.LOGIN, loginData)
}
