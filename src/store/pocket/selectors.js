import config from 'config'

const { currencies } = config
const defaultValue = 1000

const initialState = currencies.reduce((state, c) => ({
  ...state,
  [c]: defaultValue
}), {})

export const getPockets = state => state

export const getCurrentPocket = (state, pocket) => state[pocket] || 0

export default initialState
