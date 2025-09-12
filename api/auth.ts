import {AccessTokenResponse, SignUp} from "@reformetypes/authTypes";
import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";

export const postSignUp = (signUpData: SignUp): Promise<AxiosResponse<AccessTokenResponse>> => {
    console.log('SIGNUP DATA ============', signUpData)
    return apiClient.post('/authentication/sign-up', signUpData)
}
