import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <Fragment>
      <Link style={padding} to={'/'}>
        Blogs
      </Link>
      <Link style={padding} to={'/users'}>
        Users
      </Link>
    </Fragment>
  )
}

export default Menu
