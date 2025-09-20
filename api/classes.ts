import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes";
import {ClassList, CreateClassPayload} from "@reformetypes/classTypes";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export const getClasses = (filters?: Record<string, any>): Promise<AxiosResponse<ShortPaginatedResponse<ClassList>>> => {
    return apiClient.get(APIRoutes.CLASSES.MAIN, {params: filters})
}

export const postCreateClass = (classInfo: CreateClassPayload) => {
    return apiClient.post(APIRoutes.CLASSES.MAIN, classInfo)
}
