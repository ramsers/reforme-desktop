import { eRole } from '@reformetypes/authTypes'
import { PassPurchase } from './paymentTypes'

export type User = {
    id: string
    createdAt: Date
    email: string
    name: string
    phoneNumber: string
    role: eRole
    purchases: PassPurchase[]
}

export type CreateUserPayload = {
    name: string
    email: string
    phoneNumber: string
    role: eRole
    password?: string
}
