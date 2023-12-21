import { Fragment } from 'react'

const LoginForm = ({ handleLogin, user, setUsername, setPassword }) => {
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
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </Fragment>
    )
  }

  return (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )
}

export default LoginForm
