import {all, takeEvery, put, delay, call, spawn} from "redux-saga/effects"
import signUpFormSaga from "@store/sagas/signUpSagas";
import classesSagas from "@store/sagas/classSagas";
import userSagas from "@store/sagas/userSagas";
import bookingSagas from "@store/sagas/bookingSagas";

export default function* rootSaga() {
    const sagas = [
        signUpFormSaga,
        classesSagas,
        userSagas,
        bookingSagas
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
