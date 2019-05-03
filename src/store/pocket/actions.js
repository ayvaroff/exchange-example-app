import { createAction } from 'redux-actions'

const model = 'pocket'
const ca = type => createAction(`${model}/${type}`)

export const updatePocket = ca('UPDATE')
