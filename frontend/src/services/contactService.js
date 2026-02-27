import api from './api'

export const sendMessage = async (formData) => {
  const response = await api.post('/contacts', formData)
  return response.data
}