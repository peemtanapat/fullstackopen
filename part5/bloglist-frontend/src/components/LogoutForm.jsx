import PropTypes from 'prop-types'

const LogoutForm = ({ user, handleLogout }) => {
  return (
    <form onSubmit={handleLogout}>
      <label>{user.name} logged in</label>
      <button type="submit">Logout</button>
    </form>
  )
}

LogoutForm.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default LogoutForm
