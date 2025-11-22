import { AxiosResponse } from 'axios'
import {
    deleteUserDashboard,
    getAllClients,
    getAllInstructors,
    getUser,
    getUserInfo,
    patchUpdateUser,
    postCreateUser,
} from '@api/user'
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
    deleteUserSuccess,
    deleteUser,
} from '@store/slices/userSlice'
import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { toastError, toastLoading, toastSuccess } from 'lib/toast'
import { extractApiError } from 'utils/apiUtils'

export function* fetchUserInfoSaga() {
    try {
        const response: AxiosResponse<User> = yield call(getUserInfo)

        yield put(fetchUserInfoSuccess(response.data))
    } catch (e) {}
}

export function* fetchAllInstructorsSaga(action: PayloadAction<Record<string, any>>) {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<User>> = yield call(getAllInstructors, action.payload)

        yield put(fetchAllInstructorsSuccess(response.data))
    } catch (e) {}
}

export function* createUserSaga(action: PayloadAction<CreateUserPayload>) {
    try {
        const response: AxiosResponse<User> = yield call(postCreateUser, action.payload)

        yield put(createUserSuccess(response.data))
        toastSuccess('User created!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* updateUserSaga(action: PayloadAction<Partial<User>>) {
    try {
        const response: AxiosResponse<User> = yield call(patchUpdateUser, action.payload)

        yield put(updateUserSuccess(response.data))
        toastSuccess('User updated!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

export function* fetchAllClientsSaga(action: PayloadAction<Record<string, any>>) {
    try {
        const response: AxiosResponse<ShortPaginatedResponse<User>> = yield call(getAllClients, action.payload)

        yield put(fetchAllClientsSuccess(response.data))
    } catch (e) {}
}

export function* retrieveUserSaga(action: PayloadAction<string>) {
    try {
        const response: AxiosResponse<User> = yield call(getUser, action.payload)
        yield put(retrieveUserSuccess(response.data))
    } catch (e) {}
}

export function* deleteUserSaga(action: PayloadAction<string>) {
    toastLoading('Deleting user...')
    try {
        yield call(deleteUserDashboard, action.payload)
        yield put(deleteUserSuccess(action.payload))
        toastSuccess('User deleted!')
    } catch (e) {
        const message = extractApiError(e)
        toastError(message)
    }
}

function* userSagas() {
    yield takeEvery(fetchUserInfo.type, fetchUserInfoSaga)
    yield takeEvery(fetchAllInstructors.type, fetchAllInstructorsSaga)
    yield takeEvery(createUser.type, createUserSaga)
    yield takeEvery(updateUser.type, updateUserSaga)
    yield takeEvery(fetchAllClients.type, fetchAllClientsSaga)
    yield takeEvery(retrieveUser.type, retrieveUserSaga)
    yield takeEvery(deleteUser.type, deleteUserSaga)
}

export default userSagas
