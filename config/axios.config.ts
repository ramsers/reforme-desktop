import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

let authInterceptorId: number

const authenticationInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
}

export const connectApi = () => {
    authInterceptorId = apiClient.interceptors.request.use(authenticationInterceptor)
}

apiClient.interceptors.request.use(authenticationInterceptor)

export const disconnectApi = () => {
    apiClient.interceptors.request.eject(authInterceptorId)
}

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data && response.headers['content-type'] === 'application/json') {
            response.data = camelizeKeys(response.data)
        }

        return response
    },
    (error: AxiosError) => {
        if (error.response?.data && error.response.headers['content-type'] === 'application/json') {
            error.response.data = camelizeKeys(error.response?.data as Object[])
        }
        throw error
    }
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken')

            // if (extractAnyErrorMessage(error.response.data) === 'account_restricted') {
            //     localStorage.setItem('accountRestricted', 'account_restricted')
            // }

            // @ts-ignore
            Router.push(appRoutes.authenticate.login).then()
        }
        throw error
    }
)

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config }
    newConfig.url = `${config.url}`

    // @ts-ignore
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig

    if (config.params) {
        newConfig.params = decamelizeKeys(config.params)
    }

    if (config.data) {
        newConfig.data = decamelizeKeys(config.data)
    }

    return newConfig
})

export default apiClient

// const authenticationInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const accessToken = localStorage.getItem('accessToken')
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
// }
