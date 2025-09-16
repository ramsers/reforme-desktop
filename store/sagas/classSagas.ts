import {PayloadAction} from "@reduxjs/toolkit";
import {call, takeLatest, put} from "redux-saga/effects";
import {fetchClasses, fetchClassesSuccess} from "@store/slices/classSlice"
import {AxiosResponse} from "axios";
import {AccessTokenResponse} from "@reformetypes/authTypes";
import {postLogin} from "@api/auth";
import {Class, ClassList} from "@reformetypes/classTypes";
import {getClasses} from "@api/classes";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export function* fetchClassesSaga(action: PayloadAction<Record<string, any>>) {
    try {
        console.log('HITTTING loginSaga =============', action.payload)
        try {
            const response: AxiosResponse<ShortPaginatedResponse<Class>> = yield call(getClasses, action.payload)
            yield put(fetchClassesSuccess(response.data))
        } catch (e) {

        }
    } catch (e) {

    }
}

function* classesSagas() {
    yield takeLatest(fetchClasses.type, fetchClassesSaga)
}

export default classesSagas
