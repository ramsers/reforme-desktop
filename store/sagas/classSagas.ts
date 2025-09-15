import {PayloadAction} from "@reduxjs/toolkit";
import {call, takeLatest} from "redux-saga/effects";
import {fetchClasses} from "@store/slices/classSlice"
import {AxiosResponse} from "axios";
import {AccessTokenResponse} from "@reformetypes/authTypes";
import {postLogin} from "@api/auth";
import {ClassList} from "@reformetypes/classTypes";
import {getClasses} from "@api/classes";

export function* fetchClassesSaga(action: PayloadAction<string>) {
    try {
        console.log('HITTTING loginSaga =============', action.payload)
        try {
            const response: AxiosResponse<ClassList> = yield call(getClasses, action.payload)
            console.log('HITTTING xloginSaga =============', response)

        } catch (e) {

        }
    } catch (e) {

    }
}

function* classesSagas() {
    yield takeLatest(fetchClasses.type, fetchClassesSaga)
}

export default classesSagas
