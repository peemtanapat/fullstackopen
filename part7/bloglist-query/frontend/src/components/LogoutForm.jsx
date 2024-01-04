import UserInfoContext from '../contexts/UserInfoContext'
import { useContext } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LogoutForm = () => {
  const [userInfo, userInfoDispatch] = useContext(UserInfoContext)

  const handleLogout = (event) => {
    event.preventDefault()

    userInfoDispatch({ payload: null })
    loginService.setLoggedUser(null)
    blogService.setToken(null)
  }

  return (
    <form onSubmit={handleLogout}>
      <label>{userInfo.name} logged in </label>
      <button type="submit" data-cy="button-logout">
        Logout
      </button>
      <br />
      <br />
    </form>
  )
}

export default LogoutForm
