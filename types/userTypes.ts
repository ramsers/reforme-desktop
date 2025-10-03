import { eRole } from '@reformetypes/authTypes'

export type User = {
    id: string
    createdAt: Date
    email: string
    name: string
    phoneNumber: string
    role: eRole
}

export type CreateUserPayload = {
    name: string
    email: string
    phoneNumber: string
    role: eRole
    password?: string
}
