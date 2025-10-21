import { Class, ClassList, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { createBookingSuccess } from './bookingSlice'
import { Booking } from '@reformetypes/bookingTypes'
import { act } from 'react'

export type ClassSliceType = {
    class: Class | null
    classes: ShortPaginatedResponse<Class>
}

const initialState: ClassSliceType = {
    class: null,
    classes: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
}

const classSlice = createSlice({
    name: 'classSlice',
    initialState: initialState,
    reducers: {
        fetchClass: (state, action: PayloadAction<string>) => state,
        fetchClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class = action.payload
            return state
        },
        fetchClasses: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchClassesSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Class>>) => {
            state.classes.count = action.payload.count
            state.classes.next = action.payload.next
            state.classes.previous = action.payload.previous
            state.classes.results = action.payload.results
            return state
        },
        createClass: (state, action: PayloadAction<CreateClassPayload>) => state,
        createClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class = action.payload
            state.classes.results.push(action.payload)
            return state
        },
        partialUpdateClass: (state, action: PayloadAction<PartialUpdateClassPayload>) => state,
        partialUpdateClassSuccess: (state, action: PayloadAction<Class>) => {
            const indexToUpdate = state.classes.results.findIndex(
                (classToUpdate) => classToUpdate.id === action.payload.id
            )

            state.classes.results[indexToUpdate] = action.payload
            return state
        },
        clearClass: (state) => {
            state.class = null
            return state
        },
        removeClassBooking: (state, action: PayloadAction<{ classId: string; bookingId: string }>) => {
            const { classId, bookingId } = action.payload
            const classToUpdate = state.classes.results.find((cls) => cls.id === classId)

            console.log('Class to update =============', classToUpdate)

            if (classToUpdate) {
                const bookingIndex = classToUpdate.bookings.findIndex((booking) => booking.id === bookingId)
                if (bookingIndex !== -1) {
                    classToUpdate.bookings.splice(bookingIndex, 1)
                    classToUpdate.bookingsCount -= 1
                    console.log('bookingIndex =============', classToUpdate.bookingsCount)

                    classToUpdate.isFull = classToUpdate.bookingsCount >= classToUpdate.size
                }
            }

            if (state.class && state.class.id === classId) {
                const bookingIndex = state.class.bookings.findIndex((booking) => booking.id === bookingId)
                if (bookingIndex !== -1) {
                    state.class.bookings.splice(bookingIndex, 1)
                    state.class.bookingsCount -= 1
                    state.class.isFull = state.class.bookingsCount >= state.class.size
                }
            }

            return state
        },
        deleteClass: (state, action: PayloadAction<{ id: string; deleteSeries: boolean }>) => state,
        deleteClassSuccess: (state, action: PayloadAction<{ id: string; deleteSeries: boolean }>) => {
            const { id, deleteSeries } = action.payload

            if (deleteSeries) {
                state.classes.results = state.classes.results.filter(
                    (cls) => cls.id !== id && cls?.parentClassId !== id
                )
            } else {
                state.classes.results = state.classes.results.filter((cls) => cls.id !== id)
            }

            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBookingSuccess, (state, action: PayloadAction<Booking>) => {
            const classToUpdateIndex = state.classes.results.findIndex(
                (cls) => cls.id === action.payload.bookedClass.id
            )

            if (classToUpdateIndex !== -1) {
                const classToUpdate = state.classes.results[classToUpdateIndex]
                classToUpdate.bookings.push({ id: action.payload.id, client: action.payload.client })
                classToUpdate.bookingsCount += 1
                classToUpdate.isFull = classToUpdate.bookingsCount >= classToUpdate.size
            }

            if (state.class && state.class.id === action.payload.bookedClass.id) {
                state.class.bookings.push(action.payload)
                state.class.bookingsCount += 1
                state.class.isFull = state.class.bookingsCount >= state.class.size
            }

            return state
        })
    },
})

export const {
    fetchClasses,
    fetchClassesSuccess,
    createClass,
    createClassSuccess,
    fetchClass,
    fetchClassSuccess,
    partialUpdateClass,
    partialUpdateClassSuccess,
    clearClass,
    removeClassBooking,
    deleteClass,
    deleteClassSuccess,
} = classSlice.actions
export default classSlice.reducer
