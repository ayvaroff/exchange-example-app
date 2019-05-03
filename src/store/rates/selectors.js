const initialState = {
  base: 'USD',
  rates: {},
  loading: false,
  currentRate: 0,
}

export const getRatesInfo = state => state

export const getCurrentRate = state => state.currentRate

export default initialState
