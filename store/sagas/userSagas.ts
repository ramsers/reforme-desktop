import {AxiosResponse} from "axios";
import {getUserInfo} from "@api/user";
import {call, put, takeEvery} from "redux-saga/effects";
import {fetchUserSuccess, fetchUser} from "@store/slices/userSlice"
import {User} from "@reformetypes/userTypes";

export function* fetchUserSaga() {
    console.log('IAM HITTING the SAGA =========')
    try {
        const response: AxiosResponse<User> = yield call(getUserInfo)
        console.log('IAM HITTING the response =========', response)

        yield put(fetchUserSuccess(response.data))
    } catch (e) {

    }
}

function* userSagas() {
    yield takeEvery(fetchUser.type, fetchUserSaga)
}

export default userSagas
