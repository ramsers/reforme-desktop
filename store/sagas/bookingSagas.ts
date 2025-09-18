import {PayloadAction} from "@reduxjs/toolkit";
import {Booking, CreateBookingPayload} from "@reformetypes/bookingTypes";
import {AxiosResponse} from "axios";
import {getFetchBookings, postCreateBooking} from "@api/booking";
import {call, put, takeLatest} from "redux-saga/effects";
import {createBooking, createBookingSuccess, fetchBookings, fetchBookingsSuccess} from "@store/slices/bookingSlice"
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export function* createBookingSaga(action: PayloadAction<CreateBookingPayload>) {
    console.log('ACTION PAYLOAD SAGA ==============', action.payload)
    try {
        const response: AxiosResponse<Booking> = yield call(postCreateBooking, action.payload)
        console.log('RESPONSE ================', response)
    } catch (e) {
        console.log('Error:', e)
    }
}

export function* fetchBookingsSaga() {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<Booking[]>> = yield call(getFetchBookings)
        yield put(fetchBookingsSuccess(response.data))

        console.log('RESPONSE FETCH BooKING ===============', response.data)
    } catch (e) {

    }
}

function* bookingSagas() {
    yield takeLatest(createBooking.type, createBookingSaga)
    yield takeLatest(fetchBookings.type, fetchBookingsSaga)
}
export default bookingSagas
