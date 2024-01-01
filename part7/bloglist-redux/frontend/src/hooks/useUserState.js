import { useMemo } from 'react'
import { LOGGED_BLOG_APP_USER } from '../constant'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'

const useUserState = () => {
  const userState = useSelector((state) => state.user)

  const user = useMemo(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      return loggedUser
    }

    return userState
  })

  return user
}

export default useUserState
