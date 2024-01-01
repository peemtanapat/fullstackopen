import { useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'

import './css/index.css'

import { loadBlogList } from './reducers/blogListReducer'

import { Route, Routes } from 'react-router-dom'
import BlogUser from './components/BlogUser'
import BlogHome from './components/BlogHome'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import useUserState from './hooks/useUserState'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useUserState()

  useEffect(() => {
    if (user) {
      dispatch(loadBlogList())
    }
  }, [user])

  return (
    <Container>
      <Notification />

      {user && (
        <Fragment>
          <Menu user={user} />

          <h2>The Ultimate Blog Application</h2>

          <LogoutForm user={user} />
        </Fragment>
      )}

      <Routes>
        <Route path="/" element={<BlogHome />} />
        <Route path="/users" element={<BlogUser />} />
        <Route path="/users/:id" element={<UserBlogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  )
}

export default App
