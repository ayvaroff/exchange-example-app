import config from 'config'

const { currencies } = config

const initialState = {
  amount: 0,
  from: currencies[0],
  to: currencies[1],
  converted: 0,
}

export const getExchangeAmount = state => state.amount

export const getExchangeConverted = state => state.converted

export const getExchangeFrom = state => state.from

export const getExchangeTo = state => state.to

export const getExchange = state => ({
  exchangeAmount: getExchangeAmount(state),
  exchangeConverted: getExchangeConverted(state),
  exchangeFrom: getExchangeFrom(state),
  exchangeTo: getExchangeTo(state),
})

export default initialState
