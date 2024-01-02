import { useEffect, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import './css/index.css'

import { loadBlogList } from './reducers/blogListReducer'

import { Route, Routes } from 'react-router-dom'
import BlogUser from './components/BlogUser'
import BlogHome from './components/BlogHome'
import Notification from './components/Notification'
import Menu from './components/Menu'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import useUserState from './hooks/useUserState'
import { Container, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useUserState()

  const [forceLogout, setForceLogout] = useState(false)

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
          <Menu user={user} setForceLogout={setForceLogout} />
          <br />
          <Typography fontSize={24}>The Ultimate Blog Application</Typography>
          <br />
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
