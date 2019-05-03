import { handleActions } from 'redux-actions'
import {
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
  updateExchangeConverted,
} from './actions'
import initialState from './selectors'

const reducer = handleActions({
  [setExchangeFrom]: (state, { payload }) => ({
    ...state,
    from: payload,
  }),
  [setExchangeTo]: (state, { payload }) => ({
    ...state,
    to: payload,
  }),
  [updateExchangeAmount]: (state, { payload }) => ({
    ...state,
    amount: payload
  }),
  [updateExchangeConverted]: (state, { payload }) => ({
    ...state,
    converted: payload
  })
}, initialState)

export default reducer
