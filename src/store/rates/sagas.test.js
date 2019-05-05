import { expectSaga } from 'redux-saga-test-plan'
import MockAdapter from 'axios-mock-adapter'
import { apiInstance } from 'utils/api'

import * as reducer from './reducer'
import * as actions from './actions'
import * as sagas from './sagas'

jest.mock('money')

describe('Test loading exchange rates ', () => {
  let axiosMock

  const payload = {
    base: 'USD',
    rates: {
      USD: 1,
      EUR: 1.23,
      GBP: 1.5,
    }
  }

  beforeEach(() => {
    axiosMock = new MockAdapter(apiInstance)
  })

  afterAll(() => {
    axiosMock.restore()
  })

  it('with data to store', () => {
    axiosMock
      .onGet('/latest')
      .reply(200, { ...payload })

    return expectSaga(sagas.getLatesRates)
      .withState({
        exchange: {
          from: 'USD',
        },
      })
      .put({
        ...actions.updateRates(),
        payload,
      })
      .withReducer(reducer.default)
      .hasFinalState({
        ...payload,
        currentRate: 0,
        loading: false,
        loadingError: false,
      })
      .run()
  })

  it('with failure', async () => {
    axiosMock.onAny().reply(404)

    expectSaga(sagas.getLatesRates)
      .put({
        ...actions.requestErrorRates()
      })
      .withReducer(reducer.default)
      .hasFinalState({
        base: payload.base,
        rates: {},
        currentRate: 0,
        loading: false,
        loadingError: true,
      })
      .run()
  })
})
