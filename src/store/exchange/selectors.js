import config from 'config'

const { currencies } = config

const initialState = {
  amount: 0,
  converted: 0,
  error: true,
  from: currencies[0],
  to: currencies[1],
}

export const getExchangeFrom = state => state.from

export const getExchangeInfo = state => state

export default initialState
