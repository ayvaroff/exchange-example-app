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
  updateExchangeError,
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
import {
  convert,
  formatValue,
} from 'utils/currency'

export function* checkExchangeError({ amount, from, to }) {
  const currentPocketValue = yield select(fromPocket.getCurrentPocket, from)
  const error = (currentPocketValue - amount) < 0 || from === to || !amount

  yield put(updateExchangeError(error))
}

export function* calculateExchangeAmounts() {
  const ratesInfo = yield select(fromRates.getRatesInfo)
  const {
    amount,
    from,
    to,
  } = yield select(fromExchange.getExchangeInfo)

  const convertedAmount = convert({
    amount,
    from,
    to,
  }, ratesInfo)

  yield put(updateExchangeConverted(convertedAmount))
  yield call(checkExchangeError, ({ amount, from, to }))
  yield call(calculateCurrentRate)
}

export function* refreshRates() {
  yield call(getLatesRates)
  yield call(calculateExchangeAmounts)
}

export function* makeValuesConvertion() {
  const pockets = yield select(fromPocket.getPockets)
  const {
    amount,
    converted,
    from,
    to,
  } = yield select(fromExchange.getExchangeInfo)

  const newValueFrom = formatValue(pockets[from] - amount)
  const newValueTo = formatValue(pockets[to] + converted)

  if (newValueFrom >= 0) {
    yield put(updatePocket({
      [from]: newValueFrom,
      [to]: newValueTo,
    }))
  }

  yield call(checkExchangeError, ({ amount, from, to }))
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
