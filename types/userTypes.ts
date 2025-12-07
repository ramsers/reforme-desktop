import { eRole } from '@reformetypes/authTypes'
import { PassPurchase } from './paymentTypes'

export type Account = {
    bio?: string | null
    timezone: string
}

export type User = {
    id: string
    createdAt: Date
    email: string
    name: string
    phoneNumber: string
    role: eRole
    account: Account
    purchases: PassPurchase[]
}

export type CreateUserPayload = {
    name: string
    email: string
    phoneNumber: string
    role: eRole
    password?: string
}
