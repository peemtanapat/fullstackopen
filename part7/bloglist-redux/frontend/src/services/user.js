import axios from 'axios'

const baseUrl = '/api/users'

export const getUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getUser = async ({ userId }) => {
  const res = await axios.get(`${baseUrl}/${userId}`)
  return res.data
}
