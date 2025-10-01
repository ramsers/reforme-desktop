import { AxiosResponse } from 'axios'
import { getAllClients, getAllInstructors, getUser, getUserInfo, patchUpdateUser, postCreateUser } from '@api/user'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    fetchUserInfoSuccess,
    fetchUserInfo,
    fetchAllInstructors,
    fetchAllInstructorsSuccess,
    createUser,
    createUserSuccess,
    updateUserSuccess,
    updateUser,
    fetchAllClientsSuccess,
    fetchAllClients,
    retrieveUser,
    retrieveUserSuccess,
} from '@store/slices/userSlice'
import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { PayloadAction } from '@reduxjs/toolkit'

export function* fetchUserInfoSaga() {
    try {
        const response: AxiosResponse<User> = yield call(getUserInfo)

        yield put(fetchUserInfoSuccess(response.data))
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

export function* fetchAllClientsSaga() {
    try {
        const response: AxiosResponse<User[]> = yield call(getAllClients)

        yield put(fetchAllClientsSuccess(response.data))
    } catch (e) {}
}

export function* retrieveUserSaga(action: PayloadAction<string>) {
    try {
        console.log('hitting fetch user by id saga=================', action.payload)
        const response: AxiosResponse<User> = yield call(getUser, action.payload)
        yield put(retrieveUserSuccess(response.data))
    } catch (e) {}
}

function* userSagas() {
    yield takeEvery(fetchUserInfo.type, fetchUserInfoSaga)
    yield takeEvery(fetchAllInstructors.type, fetchAllInstructorsSaga)
    yield takeEvery(createUser.type, createUserSaga)
    yield takeEvery(updateUser.type, updateUserSaga)
    yield takeEvery(fetchAllClients.type, fetchAllClientsSaga)
    yield takeEvery(retrieveUser.type, retrieveUserSaga)
}

export default userSagas
