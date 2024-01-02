import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <form onSubmit={handleLogout}>
      <label>{user.name} logged in </label>
      <button type="submit" data-cy="button-logout">
        Logout
      </button>
      <br />
      <br />
    </form>
  )
}

export default LogoutForm
