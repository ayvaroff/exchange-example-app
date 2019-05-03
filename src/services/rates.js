import api from 'utils/api'

export const getLatest = base => api({
  method: 'get',
  url: 'latest.json',
  params: {
    base,
  }
})

export const getCurrencies = base => api({
  method: 'get',
  url: 'currencies.json',
  params: {
    base,
  }
})
