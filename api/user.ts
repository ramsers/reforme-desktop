import {AxiosResponse} from "axios";
import {User} from "@reformetypes/userTypes";
import apiClient from "../config/axios.config";
import AppRoutes from "../config/appRoutes";
import APIRoutes from "../config/reformeApiRoutes";

export const getUserInfo = (): Promise<AxiosResponse<User>> => {
    return apiClient.get(APIRoutes.USER.ME)
}
