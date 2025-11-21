import axios from 'axios';

export function useApi(baseUrl) {
  const apiBaseUrl = baseUrl || import.meta.env.VIT_API_BASE_URL;
  const TOKEN = 'v-token'
  const apiClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  })

  apiClient.interceptors.request.use(config => {
    async (config) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }



  apiClient.interceptors.response.use(
    response => response,
    (error) => {
      console.error('API Error:', error.response || error.message || error);
      return Promise.reject(error)
    }
  )


  return apiClient;
}
