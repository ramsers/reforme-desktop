import {eRole} from "@reformetypes/authTypes";

export type User = {
    id: string
    name: string
    phoneNumber: string
    role: eRole
}
