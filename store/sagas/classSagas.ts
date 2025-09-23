import {PayloadAction} from "@reduxjs/toolkit";
import {call, takeLatest, put} from "redux-saga/effects";
import {
    fetchClasses, fetchClassesSuccess, createClass,
    fetchClass, fetchClassSuccess, partialUpdateClass, partialUpdateClassSuccess, clearClass
}
from "@store/slices/classSlice"
import {AxiosResponse} from "axios";
import {Class, CreateClassPayload, PartialUpdateClassPayload} from "@reformetypes/classTypes";
import {getClass, getClasses, patchUpdateClass, postCreateClass} from "@api/classes";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export function* fetchClassesSaga(action: PayloadAction<Record<string, any>>) {
    try {
        try {
            const response: AxiosResponse<ShortPaginatedResponse<Class>> = yield call(getClasses, action.payload)
            yield put(fetchClassesSuccess(response.data))
        } catch (e) {

        }
    } catch (e) {

    }
}

export function* createClassSaga(action: PayloadAction<CreateClassPayload>) {
    try {
        yield call(postCreateClass, action.payload)
        yield put(fetchClasses({}))
    } catch (e) {

    }
}

export function* fetchClassSaga(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<Class> = yield call(getClass, action.payload)
        yield put(fetchClassSuccess(response.data))
    } catch (e) {

    }
}

export function* partialUpdateClassSaga(action: PayloadAction<PartialUpdateClassPayload>) {

    try {
        const response: AxiosResponse<Class> = yield call(patchUpdateClass, action.payload)

        yield put(partialUpdateClassSuccess(response.data))
        yield put(clearClass())

    } catch (e) {

    }
}

function* classesSagas() {
    yield takeLatest(fetchClasses.type, fetchClassesSaga)
    yield takeLatest(createClass.type, createClassSaga)
    yield takeLatest(fetchClass.type, fetchClassSaga)
    yield takeLatest(partialUpdateClass.type, partialUpdateClassSaga)
}

export default classesSagas
