import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes";
import {ClassList} from "@reformetypes/classTypes";

export const getClasses = (filter?: string): Promise<AxiosResponse<ClassList>> => {
    return apiClient.get(APIRoutes.CLASSES.LIST(filter))
}
