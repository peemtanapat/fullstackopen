import { AppBar, Button, Toolbar } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Label } from '@mui/icons-material'

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Button color="inherit">
          <Link style={padding} to={'/'}>
            Blogs
          </Link>
        </Button>
        <Button color="inherit">
          <Link style={padding} to={'/users'}>
            Users
          </Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        <p>{user.name}</p>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
