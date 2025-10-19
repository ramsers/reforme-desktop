import { User } from '@reformetypes/userTypes'
import { Booking, BookingClient } from './bookingTypes'

export type Class = {
    id: string
    title: string
    description: string
    size: number
    length: number
    date: Date
    instructor: User | null
    bookingsCount: number
    isFull: boolean
    bookings: BookingClient[]
    recurrenceType: eRecurrenceType
    recurrenceDays: number[]
}

export type ClassList = {
    classes: Class[]
}

export type CreateClassPayload = {
    title: string
    description: string
    size: number
    length: number
    date: Date
    instructorId?: User | null
}

export type PartialUpdateClassPayload = {
    id: string
    title?: string
    description?: string
    size?: number
    length?: number
    date?: Date
    instructorId?: User | null
    updateSeries?: boolean
}

export enum eRecurrenceType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}
