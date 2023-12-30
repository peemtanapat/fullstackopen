import { useEffect, Fragment, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './css/index.css'

import blogService from './services/blogs'

import { loadBlogList } from './reducers/blogListReducer'

import { LOGGED_BLOG_APP_USER } from './constant'
import { Route, Routes } from 'react-router-dom'
import BlogUser from './components/BlogUser'
import BlogHome from './components/BlogHome'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const user = useMemo(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      return loggedUser
    }

    return userState
  })

  useEffect(() => {
    if (user) {
      dispatch(loadBlogList())
    }
  }, [user])

  return (
    <Fragment>
      <Notification />

      {user && (
        <Fragment>
          <Menu />

          <h2>Blog&#39;s {user.name}</h2>

          <LogoutForm user={user} />
        </Fragment>
      )}

      <Routes>
        <Route path="/" element={<BlogHome user={user} />} />
        <Route path="/users" element={<BlogUser></BlogUser>} />
      </Routes>
    </Fragment>
  )
}

export default App
