import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (baseUrl, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (baseUrl, id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, create, update, setToken }
