import { createAction } from 'redux-actions'

const model = 'exchange'
const ca = type => createAction(`${model}/${type}`)

export const setExchangeFrom = ca('SET_FROM')
export const setExchangeTo = ca('SET_TO')
export const updateExchangeAmount = ca('UPDATE_AMOUNT')
