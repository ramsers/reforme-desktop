import { Booking, CreateBookingPayload } from '@reformetypes/bookingTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { AsyncResource } from '@reformetypes/common/ApiTypes'

export type BookingSliceType = {
    booking: Booking | null
    bookings: AsyncResource<ShortPaginatedResponse<Booking>>
}

const initialState: BookingSliceType = {
    booking: null,
    bookings: {
        hasFetched: false,
        fetching: true,
        data: {
            count: 0,
            next: null,
            previous: null,
            results: [],
        },
    },
}

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState: initialState,
    reducers: {
        fetchBookings: (state, action: PayloadAction<Record<string, any>>) => {
            state.bookings.fetching = true
            return state
        },
        fetchBookingsSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Booking>>) => {
            state.bookings.fetching = false
            state.bookings.hasFetched = true
            state.bookings.data.count = action.payload.count
            state.bookings.data.next = action.payload.next
            state.bookings.data.previous = action.payload.previous
            state.bookings.data.results = action.payload.results

            return state
        },
        createBooking: (state, action: PayloadAction<CreateBookingPayload>) => state,
        createBookingSuccess: (state, action: PayloadAction<Booking>) => {
            state.booking = action.payload
            return state
        },
        deleteUserBooking: (state, action: PayloadAction<string>) => state,
        deleteUserBookingSuccess: (state, action: PayloadAction<string>) => {
            const indexToRemove = state.bookings.data.results.findIndex((booking) => booking.id === action.payload)

            if (indexToRemove !== -1) {
                state.bookings.data.results.splice(indexToRemove, 1)
                state.bookings.data.count -= 1
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
