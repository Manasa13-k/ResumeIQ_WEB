import axios from 'axios'
import { getToken } from './auth'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout for AI analysis
})

// Request Interceptor: Automatically attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Health Check API call
export const checkHealth = async () => {
  const response = await api.get('/health')
  return response.data
}

// Auth API calls
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// Resume Upload API call
export const uploadResumeFile = async (formData) => {
  const response = await api.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// AI Analysis API calls
export const analyzeResume = async (analysisData) => {
  const response = await api.post('/analysis', analysisData)
  return response.data
}

export const getAnalysisById = async (id) => {
  const response = await api.get(`/analysis/${id}`)
  return response.data
}

// Dashboard API call
export const getDashboard = async () => {
  const response = await api.get('/dashboard')
  return response.data
}

export default api
