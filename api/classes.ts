import { Axios, AxiosResponse } from 'axios'
import apiClient from '../config/axios.config'
import APIRoutes from '../config/reformeApiRoutes'
import { Class, ClassList, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { de } from 'date-fns/locale'

export const getClasses = (
    filters?: Record<string, any>
): Promise<AxiosResponse<ShortPaginatedResponse<ClassList>>> => {
    return apiClient.get(APIRoutes.CLASSES.MAIN, { params: filters })
}

export const postCreateClass = (classInfo: CreateClassPayload) => {
    return apiClient.post(APIRoutes.CLASSES.MAIN, classInfo)
}

export const getClass = (id: string): Promise<AxiosResponse<Class>> => {
    return apiClient.get(APIRoutes.CLASSES.BY_ID(id))
}

export const patchUpdateClass = (data: PartialUpdateClassPayload): Promise<AxiosResponse<Class>> => {
    const { id, ...payload } = data

    return apiClient.patch(APIRoutes.CLASSES.PARTIAL_UPDATE(id), { ...payload })
}

export const deleteClasses = (id: string, deleteSeries: boolean): Promise<AxiosResponse<void>> => {
    return apiClient.delete(APIRoutes.CLASSES.DELETE(id), { params: { deleteSeries: deleteSeries } })
}
