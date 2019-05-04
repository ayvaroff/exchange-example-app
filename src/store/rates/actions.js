import { createAction } from 'redux-actions'

const model = 'rates'
const ca = type => createAction(`${model}/${type}`)

export const requestRates = ca('REQUEST')
export const requestErrorRates = ca('REQUEST_ERROR')
export const updateRates = ca('UPDATE')
export const updateCurrentRate = ca('UPDATE_CURRENT_RATE')
