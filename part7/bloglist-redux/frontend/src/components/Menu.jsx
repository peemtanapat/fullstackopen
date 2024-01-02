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
        <Button color="inherit">
          <Link to="/">Blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">Users</Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </Button>
        <Typography fontWeight="light">({user.name})</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
