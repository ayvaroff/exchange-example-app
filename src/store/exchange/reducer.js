import { handleActions } from 'redux-actions'
import {
  setExchangeFrom,
  setExchangeTo,
  updateExchangeAmount,
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
    amount: payload,
  })
}, initialState)

export default reducer
