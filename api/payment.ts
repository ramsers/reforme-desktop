import { Product } from '@reformetypes/paymentTypes'
import { AxiosResponse } from 'axios'
import apiClient from 'config/axios.config'
import APIRoutes from 'config/reformeApiRoutes'

export const getProductList = (): Promise<AxiosResponse<Product[]>> => {
    return apiClient.get(APIRoutes.PAYMENT.LIST_PRODUCTS)
}
