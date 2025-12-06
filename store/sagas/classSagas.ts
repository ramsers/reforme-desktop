import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeLatest, put } from 'redux-saga/effects'
import {
    fetchClasses,
    fetchClassesSuccess,
    createClass,
    fetchClass,
    fetchClassSuccess,
    partialUpdateClass,
    partialUpdateClassSuccess,
    clearClass,
    deleteClass,
} from '@store/slices/classSlice'
import { AxiosResponse } from 'axios'
import { Class, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { deleteClasses, getClass, getClasses, patchUpdateClass, postCreateClass } from '@api/classes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { toastError, toastLoading, toastSuccess } from 'lib/toast'
import dayjs from '@lib/dayjs'
import { extractApiError } from 'utils/apiUtils'

export function* fetchClassesSaga(action: PayloadAction<Record<string, any>>) {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<Class>> = yield call(getClasses, action.payload)
        yield put(fetchClassesSuccess({ data: response.data, append: action.payload.append }))
    } catch (e) {}
}

export function* createClassSaga(action: PayloadAction<CreateClassPayload>) {
    toastLoading('Creating class...')

    try {
        yield call(postCreateClass, action.payload)

        const now = dayjs()
        const start_date = now.startOf('week').toISOString()
        const end_date = now.endOf('week').toISOString()

        yield put(fetchClasses({ start_date, end_date }))
        toastSuccess('Class created!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* fetchClassSaga(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<Class> = yield call(getClass, action.payload)
        yield put(fetchClassSuccess(response.data))
    } catch (e) {}
}

export function* partialUpdateClassSaga(action: PayloadAction<PartialUpdateClassPayload>) {
    toastLoading('Updating class...')

    try {
        const response: AxiosResponse<Class> = yield call(patchUpdateClass, action.payload)

        yield put(partialUpdateClassSuccess({ updatedClass: response.data, updateSeries: action.payload.updateSeries }))
        if (action.payload.updateSeries) {
            const now = dayjs()
            const start_date = now.startOf('week').toISOString()
            const end_date = now.endOf('week').toISOString()

            yield put(fetchClasses({ start_date, end_date }))
        }
        yield put(clearClass())
        toastSuccess('Class updated!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* deleteClassSaga(action: PayloadAction<{ id: string; deleteSeries: boolean }>) {
    toastLoading('Deleting class...')

    try {
        yield call(deleteClasses, action.payload.id, action.payload.deleteSeries)
        const now = dayjs()
        const start_date = now.startOf('week').toISOString()
        const end_date = now.endOf('week').toISOString()

        yield put(fetchClasses({ start_date, end_date }))
        toastSuccess('Class deleted!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

function* classesSagas() {
    yield takeLatest(fetchClasses.type, fetchClassesSaga)
    yield takeLatest(createClass.type, createClassSaga)
    yield takeLatest(fetchClass.type, fetchClassSaga)
    yield takeLatest(partialUpdateClass.type, partialUpdateClassSaga)
    yield takeLatest(deleteClass.type, deleteClassSaga)
}

export default classesSagas
