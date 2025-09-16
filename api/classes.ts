import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes";
import {ClassList} from "@reformetypes/classTypes";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export const getClasses = (filters?: Record<string, any>): Promise<AxiosResponse<ShortPaginatedResponse<ClassList>>> => {
    return apiClient.get(APIRoutes.CLASSES.LIST, {params: filters})
}
