import {Booking, CreateBookingPayload} from "@reformetypes/bookingTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

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
    }
}

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState: initialState,
    reducers: {
        fetchBookings: (state) => state,
        fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
            state.bookings = action.payload
            return state
        },
        createBooking: (state, action: PayloadAction<CreateBookingPayload>) => state,
        createBookingSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Booking>>) => {
            state.booking = action.payload
            return state
        }
    }
})

export const {createBooking, createBookingSuccess, fetchBookings, fetchBookingsSuccess} = bookingSlice.actions;
export default bookingSlice.reducer
