import {
  take,
  call,
  select,
  put,
} from 'redux-saga/effects'
import {
  makeConvertion,
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
  updateExchangeConverted,
  updatePocket,
} from 'store/actions'
import {
  fromExchange,
  fromPocket,
  fromRates,
} from 'store/selectors'
import {
  calculateCurrentRate,
  getLatesRates,
} from 'store/rates/sagas'
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
  yield call(calculateCurrentRate)
}

function* refreshRates() {
  yield call(getLatesRates)
  yield call(calculateExchangeAmounts)
}

function* makeValuesConvertion() {
  const pockets = yield select(fromPocket.getPockets)
  const {
    exchangeAmount,
    exchangeConverted,
    exchangeFrom,
    exchangeTo,
  } = yield select(fromExchange.getExchange)

  const newValueFrom = pockets[exchangeFrom] - exchangeAmount
  const newValueTo = pockets[exchangeTo] + exchangeConverted

  yield put(updatePocket({
    [exchangeFrom]: newValueFrom,
    [exchangeTo]: newValueTo,
  }))
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

export function* watchMakeValuesConvertion() {
  while (true) {
    const action = yield take(makeConvertion)
    yield call(makeValuesConvertion, action)
  }
}

export default [
  watchExchangeParams,
  watchMakeValuesConvertion,
  watchRefreshRates,
]
