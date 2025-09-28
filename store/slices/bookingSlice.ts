import { Booking, CreateBookingPayload } from '@reformetypes/bookingTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { stat } from 'fs'

export type BookingSliceType = {
    booking: Booking | null
    bookings: ShortPaginatedResponse<Booking>
}

const initialState: BookingSliceType = {
    booking: null,
    bookings: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
}

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState: initialState,
    reducers: {
        fetchBookings: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
            state.bookings = action.payload
            return state
        },
        createBooking: (state, action: PayloadAction<CreateBookingPayload>) => state,
        createBookingSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Booking>>) => {
            state.booking = action.payload
            return state
        },
        deleteUserBooking: (state, action: PayloadAction<string>) => state,
        deleteUserBookingSuccess: (state, action: PayloadAction<string>) => {
            const indexToRemove = state.bookings.results.findIndex((booking) => booking.id === action.payload)

            if (indexToRemove !== -1) {
                state.bookings.results.splice(indexToRemove, 1)
                state.bookings.count -= 1
            }
            return state
        },
    },
})

export const {
    createBooking,
    createBookingSuccess,
    fetchBookings,
    fetchBookingsSuccess,
    deleteUserBooking,
    deleteUserBookingSuccess,
} = bookingSlice.actions
export default bookingSlice.reducer
