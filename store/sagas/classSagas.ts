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
    deleteClassSuccess,
} from '@store/slices/classSlice'
import { AxiosResponse } from 'axios'
import { Class, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { deleteClasses, getClass, getClasses, patchUpdateClass, postCreateClass } from '@api/classes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { toastError, toastSuccess } from 'lib/toast'
import { act } from 'react'
import { id } from 'date-fns/locale'

export function* fetchClassesSaga(action: PayloadAction<Record<string, any>>) {
    try {
        try {
            const response: AxiosResponse<ShortPaginatedResponse<Class>> = yield call(getClasses, action.payload)
            yield put(fetchClassesSuccess(response.data))
        } catch (e) {}
    } catch (e) {}
}

export function* createClassSaga(action: PayloadAction<CreateClassPayload>) {
    try {
        yield call(postCreateClass, action.payload)
        yield put(fetchClasses({}))
        toastSuccess('Class created!')
    } catch (e) {
        toastError('Error creating class. Please try again.')
    }
}

export function* fetchClassSaga(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<Class> = yield call(getClass, action.payload)
        yield put(fetchClassSuccess(response.data))
    } catch (e) {}
}

export function* partialUpdateClassSaga(action: PayloadAction<PartialUpdateClassPayload>) {
    try {
        const response: AxiosResponse<Class> = yield call(patchUpdateClass, action.payload)

        yield put(partialUpdateClassSuccess(response.data))
        yield put(clearClass())
        toastSuccess('Class updated!')
    } catch (e) {
        toastError('Error updating class. Please try again.')
    }
}

export function* deleteClassSaga(action: PayloadAction<{ id: string; deleteSeries: boolean }>) {
    try {
        console.log('TEST HITTING DELTE SAGA =====================', action.payload)
        yield call(deleteClasses, action.payload.id, action.payload.deleteSeries)
        yield put(deleteClassSuccess(action.payload))
        toastSuccess('Class deleted!')
    } catch (e) {
        console.log('ERRROR =========', e)
        toastError('Error deleting class. Please try again.')
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
