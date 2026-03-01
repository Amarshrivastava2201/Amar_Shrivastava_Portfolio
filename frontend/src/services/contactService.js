import api from './api'

export const sendMessage = async (data) => {
  const response = await api.post('/contacts', data)
  return response.data
}

export const fetchContacts = async () => {
  const response = await api.get('/contacts')
  return response.data
}

export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`)
  return response.data
}

export const markContactAsRead = async (id) => {
  const response = await api.patch(`/contacts/${id}/read`)
  return response.data
}