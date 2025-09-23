import {AxiosResponse} from "axios";
import {getAllInstructors, getUserInfo, postCreateUser} from "@api/user";
import {call, put, takeEvery} from "redux-saga/effects";
import {fetchUserSuccess, fetchUser, fetchAllInstructors,
    fetchAllInstructorsSuccess, createUser, createUserSuccess} from "@store/slices/userSlice"
import {CreateUserPayload, User} from "@reformetypes/userTypes";
import {PayloadAction} from "@reduxjs/toolkit";

export function* fetchUserSaga() {
    console.log('IAM HITTING the SAGA =========')
    try {
        const response: AxiosResponse<User> = yield call(getUserInfo)
        console.log('IAM HITTING the response =========', response)

        yield put(fetchUserSuccess(response.data))
    } catch (e) {

    }
}

export function* fetchAllInstructorsSaga() {
    try {
        const response: AxiosResponse<User[]> = yield call(getAllInstructors)

        console.log("RESPONSE ====================", response)
        yield put(fetchAllInstructorsSuccess(response.data))
    } catch (e) {

    }
}

export function* createUserSaga(action: PayloadAction<CreateUserPayload>) {
    try {
        console.log('USER =============', action.payload)
        // const response: AxiosResponse<User> = yield call(postCreateUser, action.payload)

        // console.log('USER =============', response.data)
    } catch (e) {

    }
}

function* userSagas() {
    yield takeEvery(fetchUser.type, fetchUserSaga)
    yield takeEvery(fetchAllInstructors.type, fetchAllInstructorsSaga)
    yield takeEvery(createUser.type, createUserSaga)
}

export default userSagas
