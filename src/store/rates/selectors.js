const initialState = {
  base: 'USD',
  rates: {},
  currentRate: 0,
  loadingError: false,
  loading: false,
}

export const getRatesInfo = state => state

export const getCurrentRate = state => state.currentRate

export const getRatesStatus = state => state.loadingError

export default initialState
