import {PayloadAction} from "@reduxjs/toolkit";
import {Booking, CreateBookingPayload} from "@reformetypes/bookingTypes";
import {AxiosResponse} from "axios";
import {deleteBooking, getFetchBookings, postCreateBooking} from "@api/booking";
import {call, put, takeLatest} from "redux-saga/effects";
import {createBooking, createBookingSuccess, fetchBookings, fetchBookingsSuccess, deleteUserBooking, deleteUserBookingSuccess}
from "@store/slices/bookingSlice"
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

export function* fetchBookingsSaga(action: PayloadAction<Record<string, any>>) {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<Booking[]>> = yield call(getFetchBookings, action.payload)
        yield put(fetchBookingsSuccess(response.data))

        console.log('RESPONSE FETCH BooKING ===============', response.data)
    } catch (e) {

    }
}

export function* deleteUserBookingSaga(action: PayloadAction<string>) {
    try {
        // yield call(deleteBooking, action.payload)
        yield put(deleteUserBookingSuccess(action.payload))
    } catch (e) {

    }
}

function* bookingSagas() {
    yield takeLatest(createBooking.type, createBookingSaga)
    yield takeLatest(fetchBookings.type, fetchBookingsSaga)
    yield takeLatest(deleteUserBooking.type, deleteUserBookingSaga)
}
export default bookingSagas
