import { createSlice } from '@reduxjs/toolkit'
import { LOGGED_BLOG_APP_USER, USER } from '../constant'
import loginService from '../services/login'
import blogListService from '../services/blogs'
import { pushNotification, resetNotification } from './notificationReducer'

const userSlice = createSlice({
  name: USER,
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
  },
})

export const { setLoggedUser } = userSlice.actions

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        LOGGED_BLOG_APP_USER,
        JSON.stringify(loggedUser),
      )
      blogListService.setToken(loggedUser.token)
      dispatch(setLoggedUser(loggedUser))
      dispatch(resetNotification())
    } catch (error) {
      dispatch(
        pushNotification({
          message: 'Wrong Username or Password',
          isError: true,
        }),
      )
      dispatch(resetNotification())
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      blogListService.setToken(null)
      dispatch(setLoggedUser(null))
      window.localStorage.removeItem(LOGGED_BLOG_APP_USER)
    } catch (error) {
      dispatch(
        pushNotification({
          message: `Logout error: ${error.message}`,
          isError: true,
        }),
      )
      dispatch(resetNotification())
    }
  }
}

export default userSlice.reducer
