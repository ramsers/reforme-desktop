import { PayloadAction } from '@reduxjs/toolkit'
import { Booking, CreateBookingPayload } from '@reformetypes/bookingTypes'
import { AxiosResponse } from 'axios'
import { deleteBooking, getFetchBookings, postCreateBooking } from '@api/booking'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
    createBooking,
    createBookingSuccess,
    fetchBookings,
    fetchBookingsSuccess,
    deleteUserBooking,
    deleteUserBookingSuccess,
} from '@store/slices/bookingSlice'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { toastError, toastLoading, toastSuccess } from 'lib/toast'

export function* createBookingSaga(action: PayloadAction<CreateBookingPayload>) {
    toastLoading('Creating booking...')
    try {
        const response: AxiosResponse<Booking> = yield call(postCreateBooking, action.payload)
        yield put(createBookingSuccess(response.data))
        toastSuccess('Class booked!')
    } catch (e) {
        toastError('Error booking class. Please try again')
    }
}

export function* fetchBookingsSaga(action: PayloadAction<Record<string, any>>) {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<Booking>> = yield call(getFetchBookings, action.payload)
        yield put(fetchBookingsSuccess(response.data))
    } catch (e) {}
}

export function* deleteUserBookingSaga(action: PayloadAction<string>) {
    toastLoading('Canceling booking...')

    try {
        yield call(deleteBooking, action.payload)
        yield put(deleteUserBookingSuccess(action.payload))
        toastSuccess('Booking canceled!')
    } catch (e) {
        toastError('There was error canceling your booking. Please try again.')
    }
}

function* bookingSagas() {
    yield takeLatest(createBooking.type, createBookingSaga)
    yield takeLatest(fetchBookings.type, fetchBookingsSaga)
    yield takeLatest(deleteUserBooking.type, deleteUserBookingSaga)
}
export default bookingSagas
