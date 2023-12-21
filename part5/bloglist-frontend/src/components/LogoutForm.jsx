const LogoutForm = ({ user, handleLogout }) => {
  return (
    <form onSubmit={handleLogout}>
      <label>{user.name} logged in</label>
      <button type="submit">Logout</button>
    </form>
  )
}

export default LogoutForm
