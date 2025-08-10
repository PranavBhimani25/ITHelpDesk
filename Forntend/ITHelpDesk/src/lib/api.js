import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const fetchTickets = async (query) => {
  // If backend not connected, return dummy in frontend (fallback)
  const url = `${API_BASE}/tickets${query ? `?q=${encodeURIComponent(query)}` : ''}`
  const res = await axios.get(url)
  return res.data
}

export const fetchTicketById = async (id) => {
  const res = await axios.get(`${API_BASE}/tickets/${id}`)
  return res.data
}