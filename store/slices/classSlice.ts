import { Class, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { createBookingSuccess } from './bookingSlice'
import { Booking } from '@reformetypes/bookingTypes'
import { AsyncResource } from '@reformetypes/common/ApiTypes'

export type ClassSliceType = {
    class: AsyncResource<Class | null>
    classes: AsyncResource<ShortPaginatedResponse<Class>>
}

const initialState: ClassSliceType = {
    class: {
        hasFetched: false,
        fetching: false,
        data: null,
    },
    classes: {
        hasFetched: false,
        fetching: false,
        data: {
            count: 0,
            next: null,
            previous: null,
            results: [],
        },
    },
}

const classSlice = createSlice({
    name: 'classSlice',
    initialState: initialState,
    reducers: {
        fetchClass: (state, action: PayloadAction<string>) => {
            state.class.fetching = true
            return state
        },
        fetchClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class.fetching = false
            state.class.hasFetched = true
            state.class.data = action.payload
            return state
        },
        fetchClasses: (state, action: PayloadAction<Record<string, any>>) => {
            state.classes.fetching = true
            return state
        },
        fetchClassesSuccess: (
            state,
            action: PayloadAction<{ data: ShortPaginatedResponse<Class>; append?: boolean }>
        ) => {
            const { data, append } = action.payload

            state.classes.fetching = false
            state.classes.hasFetched = true
            state.classes.data.count = data.count
            state.classes.data.next = data.next
            state.classes.data.previous = data.previous
            state.classes.data.results = append ? [...state.classes.data.results, ...data.results] : data.results
            return state
        },
        createClass: (state, action: PayloadAction<CreateClassPayload>) => state,
        createClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class.data = action.payload
            state.classes.data.results.push(action.payload)
            return state
        },
        partialUpdateClass: (state, action: PayloadAction<PartialUpdateClassPayload>) => state,
        partialUpdateClassSuccess: (state, action: PayloadAction<{ updatedClass: Class; updateSeries?: boolean }>) => {
            const { updatedClass, updateSeries } = action.payload

            const indexToUpdate = state.classes.data.results.findIndex(
                (classToUpdate) => classToUpdate.id === updatedClass.id
            )

            if (indexToUpdate !== -1) {
                state.classes.data.results[indexToUpdate] = updatedClass
            }

            if (updateSeries) {
                state.classes.data.results = state.classes.data.results.map((classToUpdate) => {
                    if (
                        (classToUpdate.parentClassId === updatedClass.parentClassId ||
                            classToUpdate.parentClassId === updatedClass.id) &&
                        new Date(classToUpdate.date) > new Date(updatedClass.date)
                    ) {
                        return {
                            ...classToUpdate,
                            title: updatedClass.title,
                            description: updatedClass.description,
                            size: updatedClass.size,
                            length: updatedClass.length,
                            instructor: updatedClass.instructor,
                            recurrenceType: updatedClass.recurrenceType,
                            recurrenceDays: updatedClass.recurrenceDays,
                            isFull: classToUpdate.bookingsCount >= updatedClass.size,
                        }
                    }

                    return classToUpdate
                })
            }
            return state
        },
        clearClass: (state) => {
            state.class.data = null
            return state
        },
        removeClassBooking: (state, action: PayloadAction<{ classId: string; bookingId: string }>) => {
            const { classId, bookingId } = action.payload
            const classToUpdate = state.classes.data.results.find((cls) => cls.id === classId)

            if (classToUpdate) {
                const bookingIndex = classToUpdate.bookings.findIndex((booking) => booking.id === bookingId)
                if (bookingIndex !== -1) {
                    classToUpdate.bookings.splice(bookingIndex, 1)
                    classToUpdate.bookingsCount -= 1
                    classToUpdate.isFull = classToUpdate.bookingsCount >= classToUpdate.size
                }
            }

            if (state.class.data && state.class.data.id === classId) {
                const bookingIndex = state.class.data.bookings.findIndex((booking) => booking.id === bookingId)
                if (bookingIndex !== -1) {
                    state.class.data.bookings.splice(bookingIndex, 1)
                    state.class.data.bookingsCount -= 1
                    state.class.data.isFull = state.class.data.bookingsCount >= state.class.data.size
                }
            }

            return state
        },
        deleteClass: (state, action: PayloadAction<{ id: string; deleteSeries: boolean }>) => state,
        deleteClassSuccess: (state, action: PayloadAction<{ id: string; deleteSeries: boolean }>) => {
            const { id, deleteSeries } = action.payload

            if (deleteSeries) {
                state.classes.data.results = state.classes.data.results.filter(
                    (cls) => cls.id !== id && cls?.parentClassId !== id
                )
            } else {
                state.classes.data.results = state.classes.data.results.filter((cls) => cls.id !== id)
            }

            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBookingSuccess, (state, action: PayloadAction<Booking>) => {
            const classToUpdateIndex = state.classes.data.results.findIndex(
                (cls) => cls.id === action.payload.bookedClass.id
            )

            if (classToUpdateIndex !== -1) {
                const classToUpdate = state.classes.data.results[classToUpdateIndex]
                classToUpdate.bookings.push({ id: action.payload.id, client: action.payload.client })
                classToUpdate.bookingsCount += 1
                classToUpdate.isFull = classToUpdate.bookingsCount >= classToUpdate.size
            }

            if (state.class.data && state.class.data.id === action.payload.bookedClass.id) {
                state.class.data.bookings.push(action.payload)
                state.class.data.bookingsCount += 1
                state.class.data.isFull = state.class.data.bookingsCount >= state.class.data.size
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
