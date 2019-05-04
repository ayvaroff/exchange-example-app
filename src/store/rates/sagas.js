import {
  take,
  put,
  call,
  select,
} from 'redux-saga/effects'
import {
  fromExchange,
  fromRates,
} from 'store/selectors'
import * as api from 'services/rates'
import {
  requestRates,
  requestErrorRates,
  updateRates,
  updateCurrentRate,
} from 'store/actions'
import { convert } from 'utils/currency'

function* requestLatestRates(currency) {
  const { data } = yield call(api.getLatest, currency)
  return data
}

export function* calculateCurrentRate() {
  const ratesInfo = yield select(fromRates.getRatesInfo)
  const {
    from,
    to,
  } = yield select(fromExchange.getExchangeInfo)

  const currentRate = convert({
    amount: 1,
    fixed: 4,
    from: to,
    to: from,
  }, ratesInfo)

  yield put(updateCurrentRate(currentRate))
}

export function* getLatesRates() {
  try {
    const currencyFrom = yield select(fromExchange.getExchangeFrom)
    const rates = yield call(requestLatestRates, currencyFrom)

    yield put(updateRates(rates))
    yield call(calculateCurrentRate)
  } catch (e) {
    yield put(requestErrorRates())
  }
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
