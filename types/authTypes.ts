import { string } from '@redux-saga/is'
import { User } from '@reformetypes/userTypes'

export type SignUpPayload = SignUp & {
    onSuccess?: () => void
    onError?: (errorMessage: string) => void
}

export type SignUp = {
    name: string
    email: string
    phoneNumber: string | null
    password: string
    role: eRole
}

export interface AccessTokenResponse {
    access: string
    user: User
}

export enum eRole {
    INSTRUCTOR = 'INSTRUCTOR',
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
}

export type LoginPayload = {
    email: string
    password: string
}

export type ForgotPasswordPayload = {
    email: string
}
