import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest} from "redux-saga/effects";
import {fetchClasses} from "@store/slices/classSlice"

export function fetchClassesSaga(action: PayloadAction<string>) {
    try {

    } catch (e) {

    }
}

function* classesSagas() {
    yield takeLatest(fetchClasses.type, fetchClassesSaga)
}

export default classesSagas
