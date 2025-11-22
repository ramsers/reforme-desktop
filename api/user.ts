import { AxiosResponse } from 'axios'
import { CreateUserPayload, User } from '@reformetypes/userTypes'
import apiClient from '../config/axios.config'
import APIRoutes from '../config/reformeApiRoutes'

export const getUserInfo = (): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.ME)
}

export const getAllInstructors = (filters?: Record<string, any>): Promise<AxiosResponse<User[]>> => {
    return apiClient.get(APIRoutes.USER.ALL_INSTRUCTORS, { params: filters })
}

export const getAllClients = (filters?: Record<string, any>): Promise<AxiosResponse<User[]>> => {
    return apiClient.get(APIRoutes.USER.ALL_CLIENTS, { params: filters })
}

export const postCreateUser = (data: CreateUserPayload): Promise<AxiosResponse<User>> => {
    return apiClient.post(APIRoutes.USER.MAIN, { ...data })
}

export const getUser = (id: string): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.BY_ID(id))
}

export const patchUpdateUser = (data: Partial<User>): Promise<AxiosResponse<User>> => {
    const { id, ...rest } = data
    return apiClient.patch(APIRoutes.USER.BY_ID(id as string), { ...rest })
}

export const deleteUserDashboard = (id: string): Promise<AxiosResponse<void>> => {
    return apiClient.delete(APIRoutes.USER.DELETE(id))
}
