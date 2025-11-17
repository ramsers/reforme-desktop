import { all, call, spawn } from 'redux-saga/effects'
import authSagas from '@store/sagas/authSagas'
import classesSagas from '@store/sagas/classSagas'
import userSagas from '@store/sagas/userSagas'
import bookingSagas from '@store/sagas/bookingSagas'
import PaymentSagas from './sagas/paymentSagas'

export default function* rootSaga() {
    const sagas = [authSagas, classesSagas, userSagas, bookingSagas, PaymentSagas]
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
    )
}
