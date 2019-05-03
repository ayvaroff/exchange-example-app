import { handleActions } from 'redux-actions'
import { updatePocket } from './actions'
import initialState from './selectors'

const reducer = handleActions({
  [updatePocket]: (state, { payload: { pocket, value } }) => ({
    ...state,
    [pocket]: value,
  })
}, initialState)

export default reducer
