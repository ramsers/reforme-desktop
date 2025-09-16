import {eRole} from "@reformetypes/authTypes";

export type User = {
    id: string
    email: string
    name: string
    phoneNumber: string
    password: string
    role: eRole
}
