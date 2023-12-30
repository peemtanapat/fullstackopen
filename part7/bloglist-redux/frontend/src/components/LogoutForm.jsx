import PropTypes from 'prop-types'

const LogoutForm = ({ user, handleLogout }) => {
  return (
    <form onSubmit={handleLogout}>
      <label>{user.name} logged in </label>
      <button type="submit" data-cy="button-logout">
        Logout
      </button>
    </form>
  )
}

LogoutForm.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default LogoutForm
