import {User} from "@reformetypes/userTypes";
import {Class} from "@reformetypes/classTypes";

export type CreateBookingPayload = {
    clientId: string
    classId: string
}

export type Booking = {
    id: string
    client: User
    bookedClass: Class
}
