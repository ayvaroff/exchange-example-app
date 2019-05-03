import { handleActions } from 'redux-actions'
import {
  requestRates,
  updateRates,
} from './actions'
import initialState from './selectors'

const reducer = handleActions({
  [requestRates]: (state) => ({
    ...state,
    loading: true,
  }),
  [updateRates]: (_, { payload }) => ({
    base: payload.base,
    rates: payload.rates,
    loading: false
  })
}, initialState)

export default reducer
