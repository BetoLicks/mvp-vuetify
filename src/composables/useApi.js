import axios from 'axios'

export function useApi(baseUrl) {
  const apiBaseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL
  const TOKEN = 'v-token'

  console.log('API Base URL:', apiBaseUrl)
  console.log('Token Key:', TOKEN)

  const apiClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  // --- Interceptor de request ---
  apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem(TOKEN)

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )

  // --- Interceptor de response ---
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error?.response || error.message || error)
      return Promise.reject(error)
    },
  )

  return apiClient
}
