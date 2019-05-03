import {
  take,
  call,
  select,
  put,
} from 'redux-saga/effects'
import {
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
  updateExchangeConverted,
} from 'store/actions'
import {
  fromExchange,
  fromRates,
} from 'store/selectors'
import { getLatesRates } from 'store/rates/sagas'
import { convert } from 'utils/currency'

function* calculateExchangeAmounts() {
  const ratesInfo = yield select(fromRates.getRatesInfo)
  const {
    exchangeAmount,
    exchangeFrom,
    exchangeTo,
  } = yield select(fromExchange.getExchange)

  const convertedAmount = convert({
    amount: exchangeAmount,
    from: exchangeFrom,
    to: exchangeTo,
  }, ratesInfo)

  yield put(updateExchangeConverted(convertedAmount))
}

function* refreshRates() {
  yield call(getLatesRates)
  yield call(calculateExchangeAmounts)
}

export function* watchExchangeParams() {
  while (true) {
    const action = yield take(setExchangeFrom)
    yield call(refreshRates, action)
  }
}

export function* watchRefreshRates() {
  while (true) {
    const action = yield take([setExchangeTo, updateExchangeAmount])
    yield call(calculateExchangeAmounts, action)
  }
}

export default [
  watchExchangeParams,
  watchRefreshRates,
]
