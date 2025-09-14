import {string} from "@redux-saga/is";

export type SignUpPayload = SignUp & {
    onSuccess: () => void
    onError: (errorMessage: string) => void
}

export type SignUp = {
    name: string
    email: string
    phoneNumber: string | null
    password: string
    role: eRole
}

export interface AccessTokenResponse {
    accessToken: string
}

export enum eRole {
    INSTRUCTOR = 'INSTRUCTOR',
    CLIENT = 'CLIENT'
}

export type LoginPayload = {
    email: string
    password: string
}
