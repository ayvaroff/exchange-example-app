import { expectSaga } from 'redux-saga-test-plan'
import MockAdapter from 'axios-mock-adapter'
import { apiInstance } from 'utils/api'

import * as ratesSagas from 'store/rates/sagas'
import * as pocketActions from 'store/pocket/actions'
import * as actions from './actions'
import * as sagas from './sagas'

jest.mock('money')

describe('Test exchnage ', () => {
  let axiosMock

  const convertedValue = 123
  const state = {
    pocket: {
      USD: 100,
      EUR: 100,
      GBP: 100,
    },
    exchange: {
      amount: 15,
      converted: 20,
      error: false,
      from: 'USD',
      to: 'EUR',
    },
    rates: {
      base: 'USD',
      rates: {
        USD: 1,
        EUR: 1.23,
        GBP: 1.5,
      }
    }
  }

  beforeEach(() => {
    axiosMock = new MockAdapter(apiInstance)
    require('money').convert.mockReturnValue(convertedValue)
  })

  afterAll(() => {
    axiosMock.restore()
  })

  it('with exchange error false', () => {
    return expectSaga(sagas.checkExchangeError, {
      amount: state.exchange.amount,
      from: state.exchange.from,
      to: state.exchange.to,
    })
      .withState({ ...state })
      .put({
        ...actions.updateExchangeError(),
        payload: false,
      })
      .run()
  })

  it('with exchange error true', () => {
    return expectSaga(sagas.checkExchangeError, {
      amount: state.exchange.amount,
      from: state.exchange.from,
      to: state.exchange.from,
    })
      .withState({ ...state })
      .put({
        ...actions.updateExchangeError(),
        payload: true,
      })
      .run()
  })

  it('with calculate amounts', () => {
    return expectSaga(sagas.calculateExchangeAmounts)
      .withState({ ...state })
      .put({
        ...actions.updateExchangeConverted(),
        payload: convertedValue,
      })
      .put({
        ...actions.updateExchangeError(),
        payload: false,
      })
      .call(ratesSagas.calculateCurrentRate)
      .run()
  })

  it('with refresh rates', () => {
    return expectSaga(sagas.refreshRates)
      .withState({ ...state })
      .call(ratesSagas.getLatesRates)
      .call(sagas.calculateExchangeAmounts)
      .run()
  })

  it('with conversion', () => {
    return expectSaga(sagas.makeValuesConvertion)
      .withState({ ...state })
      .put({
        ...pocketActions.updatePocket(),
        payload: {
          [state.exchange.from]: state.pocket[state.exchange.from] - state.exchange.amount,
          [state.exchange.to]: state.pocket[state.exchange.from] + state.exchange.converted,
        }
      })
      .put({
        ...actions.updateExchangeError(),
        payload: false,
      })
      .run()
  })
})
