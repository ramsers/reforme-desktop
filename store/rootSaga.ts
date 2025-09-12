import {all, takeEvery, put, delay, call, spawn} from "redux-saga/effects"
import { incrementByAmount } from "./slices/counterSlice"
import signUpFormSaga from "@store/sagas/signUpSagas";

function* incrementAsync() {
    yield delay(1000)
    yield put(incrementByAmount(5))
}

function* watchIncrementAsync() {
    yield takeEvery("counter/increment", incrementAsync)
}

export default function* rootSaga() {
    const sagas = [
        signUpFormSaga
    ]
    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e) {
                        console.error('Saga error, the saga will be restarted', e)
                    }
                }
            })
        )
    )}
