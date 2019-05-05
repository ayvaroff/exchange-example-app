import { expectSaga } from 'redux-saga-test-plan'
import MockAdapter from 'axios-mock-adapter'
import { apiInstance } from 'utils/api'

import * as actions from './actions'
import * as sagas from './sagas'

jest.mock('money')

describe('Test loading exchange rates ', () => {
  let axiosMock

  const convertedValue = 123
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
    require('money').convert.mockReturnValue(convertedValue)
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
        rates: payload
      })
      .put({
        ...actions.updateRates(),
        payload,
      })
      .run()
  })

  it('with failure', async () => {
    axiosMock.onAny().reply(404)

    expectSaga(sagas.getLatesRates)
      .put({
        ...actions.requestErrorRates()
      })
      .run()
  })
})
