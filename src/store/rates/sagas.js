import {
  take,
  takeEvery,
  race,
  cancelled,
  takeLatest,
  put,
  call,
  select,
  all,
} from 'redux-saga/effects'
import * as api from 'services/rates'
import { updateRates, requestRates } from 'redux/actions'

function* requestLatestRates(currency) {
  const { data } = yield call(api.getLatest, currency)
  return data
}

function* getLatesRates() {
  // get currency from store
  const currency = 'USD'

  const rates = yield call(requestLatestRates, currency)
  yield put(updateRates(rates))
}

export function* watchGetLatesRates() {
  while (true) {
    const action = yield take(requestRates)
    yield call(getLatesRates, action)
  }
}

export default [
  watchGetLatesRates,
]
