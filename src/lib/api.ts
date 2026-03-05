import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can inject standard headers here (e.g. Auth Tokens)
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify general responses directly here
    return response
  },
  (error: AxiosError) => {
    // Global error handling patterns
    if (error.response?.status === 401) {
      // Implement sign out trigger / redirection
      localStorage.removeItem("access_token")
      window.location.href = "/login"
    }
    
    // Additional generic messaging could be added through a toast library here
    return Promise.reject(error)
  }
)

export default apiClient
