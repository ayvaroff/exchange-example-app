import {
  take,
  put,
  call,
  select,
} from 'redux-saga/effects'
import { fromExchange } from 'store/selectors'
import * as api from 'services/rates'
import { updateRates, requestRates } from 'store/actions'

function* requestLatestRates(currency) {
  const { data } = yield call(api.getLatest, currency)
  return data
}

export function* getLatesRates() {
  const currency = yield select(fromExchange.getExchangeFrom)
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
