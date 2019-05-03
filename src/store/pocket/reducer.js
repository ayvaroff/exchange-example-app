import { handleActions } from 'redux-actions'
import { updatePocket } from './actions'
import initialState from './selectors'

const reducer = handleActions({
  [updatePocket]: (state, { payload }) => ({
    ...state,
    ...payload,
  })
}, initialState)

export default reducer
