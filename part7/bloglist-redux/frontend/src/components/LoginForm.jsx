import { Fragment, useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ user }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username)

    dispatch(loginUser({ username, password }))
  }

  if (user === null) {
    return (
      <Fragment>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            data-cy="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            data-cy="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit" data-cy="login-submit">
            Login
          </button>
        </form>
      </Fragment>
    )
  }
}

export default LoginForm
