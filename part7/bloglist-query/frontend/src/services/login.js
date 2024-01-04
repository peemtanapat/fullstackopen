import axios from 'axios'
import { LOGGED_BLOG_APP_USER } from '../constant'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const setLoggedUser = (userInfo) => {
  window.localStorage.setItem(LOGGED_BLOG_APP_USER, JSON.stringify(userInfo))
}

const getLoggedUser = () => {
  const userInfoJson = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
  return userInfoJson ? JSON.parse(userInfoJson) : null
}

export default { login, setLoggedUser, getLoggedUser }
