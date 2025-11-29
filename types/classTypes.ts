import { User } from '@reformetypes/userTypes'
import { Booking, BookingClient } from './bookingTypes'

export type Class = {
    id: string
    title: string
    description: string
    size: number
    length: number
    date: string
    instructor: User | null
    bookingsCount: number
    isFull: boolean
    bookings: BookingClient[]
    recurrenceType: eRecurrenceType
    recurrenceDays: number[]
    parentClassId: string
}

export type ClassList = {
    classes: Class[]
}

export type CreateClassPayload = {
    title: string
    description: string
    size: number
    length?: number
    date: string
    instructorId?: string | null
    recurrenceType?: eRecurrenceType | null
    recurrenceDays?: number[] | null
}

export type PartialUpdateClassPayload = {
    id: string
    title?: string
    description?: string
    size?: number
    length?: number
    date?: string
    instructorId?: string | null
    updateSeries?: boolean
    recurrenceType?: eRecurrenceType | null
    recurrenceDays?: number[] | null
}

export enum eRecurrenceType {
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}
