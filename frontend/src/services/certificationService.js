import api from './api'

export const fetchCertifications = async () => {
  const response = await api.get('/certifications')
  return response.data
}

export const createCertification = async (data) => {
  const response = await api.post('/certifications', data)
  return response.data
}

export const deleteCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}`)
  return response.data
}