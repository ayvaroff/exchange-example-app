import { createAction } from 'redux-actions'

const model = 'rates'
const ca = type => createAction(`${model}/${type}`)

export const requestRates = ca('REQUEST')
export const updateRates = ca('UPDATE')
