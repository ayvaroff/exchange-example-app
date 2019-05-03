import config from 'config'

const { currencies } = config

const initialState = {
  from: currencies[0],
  to: currencies[1],
  amount: 0
}

export const getExchangeFrom = state => state.from

export const getExchangeTo = state => state.to

export const getExchange = state => ({
  exchangeFrom: getExchangeFrom(state),
  exchangeTo: getExchangeTo(state),
})

export default initialState
