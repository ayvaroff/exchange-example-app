import axios from 'axios'
import config from 'config'

const {
  api: {
    baseUrl,
  }
} = config

const apiInstance = axios.create({
  baseURL: baseUrl,
})

const withRequest = options => {
  return apiInstance.request({ ...options })
}

const api = options => withRequest({ ...options })

export default api
