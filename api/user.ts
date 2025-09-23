import {AxiosResponse} from "axios";
import {CreateUserPayload, User} from "@reformetypes/userTypes";
import apiClient from "../config/axios.config";
import AppRoutes from "../config/appRoutes";
import APIRoutes from "../config/reformeApiRoutes";

export const getUserInfo = (): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.ME)
}

export const getAllInstructors = (): Promise<AxiosResponse<User[]>> => {
    return apiClient.get(APIRoutes.USER.ALL_INSTRUCTORS)
}

export const postCreateUser = (data: CreateUserPayload): Promise<AxiosResponse<User>> => {
    return apiClient.post(APIRoutes.USER.MAIN)
}
