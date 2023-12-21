import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async ({ newBlog }) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, create, setToken }
