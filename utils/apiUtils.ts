import { AxiosError } from 'axios'

export function extractApiError(error: unknown): string {
    if (isAxiosError(error) && error.response) {
        const data: any = error.response.data

        if (typeof data.detail === 'string') {
            return data.detail
        }

        if (Array.isArray(data.non_field_errors)) {
            return data.non_field_errors[0]
        }

        const firstKey = Object.keys(data)[0]
        if (firstKey && Array.isArray(data[firstKey])) {
            return data[firstKey][0]
        }

        if (typeof data === 'string') {
            try {
                const parsed = JSON.parse(data)
                const parsedKey = Object.keys(parsed)[0]
                return parsed[parsedKey][0]
            } catch {
                return data
            }
        }
    }
    return 'Something went wrong. Please try again.'
}

function isAxiosError(error: any): error is AxiosError {
    return error && error.isAxiosError
}
