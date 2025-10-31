import { CreatePurchaseIntentPayload, Product } from '@reformetypes/paymentTypes'
import { AxiosResponse } from 'axios'
import apiClient from 'config/axios.config'
import APIRoutes from 'config/reformeApiRoutes'

export const getProductList = (): Promise<AxiosResponse<Product[]>> => {
    return apiClient.get(APIRoutes.PAYMENT.LIST_PRODUCTS)
}

export const postcreatePurchaseIntent = (data: CreatePurchaseIntentPayload): Promise<AxiosResponse<string>> => {
    return apiClient.post(APIRoutes.PAYMENT.PAYMENT_INTENT, data)
}

export const postCancelSubscription = (id: string): Promise<AxiosResponse<string>> => {
    return apiClient.post(APIRoutes.PAYMENT.CANCEL_SUBSCRIPTION(id))
}
