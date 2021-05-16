import axios from 'axios'

export const ApiClient = axios.create({
  baseURL: '/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})


export default ApiClient
