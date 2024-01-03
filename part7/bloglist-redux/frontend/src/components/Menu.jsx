import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Menu = ({ user, setForceLogout }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(logoutUser())
    setForceLogout(true)
    navigate('/')
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Link to="/">
          <Button color="inherit">Blogs</Button>
        </Link>
        <Link to="/users">
          <Button color="inherit">Users</Button>
        </Link>
        <Link to="/">
          <Button
            color="inherit"
            onClick={handleLogout}
            data-cy="button-logout"
          >
            Logout
          </Button>
        </Link>
        <Typography fontWeight="light" data-cy="logged-user">
          ({user.name})
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
