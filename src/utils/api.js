import axios from 'axios'
import config from 'config'

const {
  api: {
    baseUrl,
    appId,
  }
} = config

const apiInstance = axios.create({
  baseURL: baseUrl,
})

const withRequest = options => {
  const { params } = options
  return apiInstance.request({
    ...options,
    params: {
      ...params,
      app_id: appId,
    }
  })
}

const api = options => withRequest({ ...options })

export default api
