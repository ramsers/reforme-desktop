import { AxiosResponse } from 'axios'
import { getAllInstructors, getUserInfo, patchUpdateUser, postCreateUser } from '@api/user'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    fetchUserSuccess,
    fetchUser,
    fetchAllInstructors,
    fetchAllInstructorsSuccess,
    createUser,
    createUserSuccess,
    updateUserSuccess,
    updateUser,
} from '@store/slices/userSlice'
import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { PayloadAction } from '@reduxjs/toolkit'

export function* fetchUserSaga() {
    try {
        const response: AxiosResponse<User> = yield call(getUserInfo)

        yield put(fetchUserSuccess(response.data))
    } catch (e) {}
}

export function* fetchAllInstructorsSaga() {
    try {
        const response: AxiosResponse<User[]> = yield call(getAllInstructors)

        yield put(fetchAllInstructorsSuccess(response.data))
    } catch (e) {}
}

export function* createUserSaga(action: PayloadAction<CreateUserPayload>) {
    try {
        const response: AxiosResponse<User> = yield call(postCreateUser, action.payload)

        yield put(createUserSuccess(response.data))
    } catch (e) {}
}

export function* updateUserSaga(action: PayloadAction<Partial<User>>) {
    try {
        console.log('hitting sagap=================')
        const response: AxiosResponse<User> = yield call(patchUpdateUser, action.payload)

        yield put(updateUserSuccess(response.data))
    } catch (e) {}
}

function* userSagas() {
    yield takeEvery(fetchUser.type, fetchUserSaga)
    yield takeEvery(fetchAllInstructors.type, fetchAllInstructorsSaga)
    yield takeEvery(createUser.type, createUserSaga)
    yield takeEvery(updateUser.type, updateUserSaga)
}

export default userSagas
