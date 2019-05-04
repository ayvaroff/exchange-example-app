import { handleActions } from 'redux-actions'
import {
  requestRates,
  requestErrorRates,
  updateRates,
  updateCurrentRate,
} from './actions'
import initialState from './selectors'

const reducer = handleActions({
  [requestRates]: (state) => ({
    ...state,
    loading: true,
  }),
  [requestErrorRates]: (state) => ({
    ...state,
    loading: false,
  }),
  [updateRates]: (state, { payload }) => ({
    ...state,
    base: payload.base,
    rates: payload.rates,
    loading: false
  }),
  [updateCurrentRate]: (state, { payload }) => ({
    ...state,
    currentRate: payload,
  }),
}, initialState)

export default reducer
