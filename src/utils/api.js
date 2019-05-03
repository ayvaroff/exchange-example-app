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

const api = options => apiInstance.request({ ...options })

export default api
