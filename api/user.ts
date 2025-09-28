import { AxiosResponse } from 'axios'
import { CreateUserPayload, User } from '@reformetypes/userTypes'
import apiClient from '../config/axios.config'
import AppRoutes from '../config/appRoutes'
import APIRoutes from '../config/reformeApiRoutes'

export const getUserInfo = (): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.ME)
}

export const getAllInstructors = (): Promise<AxiosResponse<User[]>> => {
    return apiClient.get(APIRoutes.USER.ALL_INSTRUCTORS)
}

export const getAllClients = (): Promise<AxiosResponse<User[]>> => {
    return apiClient.get(APIRoutes.USER.ALL_CLIENTS)
}

export const postCreateUser = (data: CreateUserPayload): Promise<AxiosResponse<User>> => {
    return apiClient.post(APIRoutes.USER.MAIN, { ...data })
}

export const getUser = (id: string): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.BY_ID(id))
}

export const patchUpdateUser = (data: Partial<User>): Promise<AxiosResponse<User>> => {
    const { id, ...rest } = data
    console.log('hitting api=================', id, data)
    return apiClient.patch(APIRoutes.USER.BY_ID(id), { ...rest })
}
