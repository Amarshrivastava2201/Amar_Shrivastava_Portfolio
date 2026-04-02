import api from './api'

export const loginAdmin = async (credentials) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
  return response.data
}