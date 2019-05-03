import api from 'utils/api'

export const getLatest = base => api({
  method: 'get',
  url: 'latest',
  params: {
    base,
  }
})
