import { useState, useEffect, Fragment } from 'react'
import { pathOr } from 'ramda'

import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

import './css/index.css'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { pushNotification } from './reducers/notificationReducer'
import {
  createNewBlog,
  deleteBlog,
  loadBlogList,
  upLikeBlog,
} from './reducers/blogListReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { LOGGED_BLOG_APP_USER } from './constant'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogList)
  const user = useSelector((state) => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      // setUserToken({ loggedUser, token: loggedUser.token })
      blogService.setToken(loggedUser.token)
      return loggedUser
    }

    if (state.user) {
      return state.user
    }

    return null
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [createdBlog, setCreatedBlog] = useState(null)
  // const [updatedBlog, setUpdatedBlog] = useState(null)
  // const [deletedBlog, setDeletedBlog] = useState(null)

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(loadBlogList())
  }, [])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
  //   if (loggedUserJSON) {
  //     const loggedUser = JSON.parse(loggedUserJSON)
  //     setUserToken({ loggedUser, token: loggedUser.token })
  //   }
  // }, [])

  // const setUserToken = ({ loggedUser, token }) => {
  //   blogService.setToken(token)
  //   // setUser(loggedUser)
  //   setUsername('')
  //   setPassword('')
  // }

  // const resetUser = () => {
  //   blogService.setToken(null)
  //   // setUser(null)
  //   window.localStorage.removeItem(LOGGED_BLOG_APP_USER)
  // }

  const handleLogin = async (event) => {
    event.preventDefault()

    // setNotificationMsg({ msg: '' })

    console.log('logging in with', username)

    dispatch(loginUser({ username, password }))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    // resetUser()
    dispatch(logoutUser())
  }

  const handleCreateBlog = async ({ newBlog }) => {
    dispatch(createNewBlog(newBlog))
  }

  const handleUpLikeBlog = async (event, toUpdateBlog) => {
    event.preventDefault()

    dispatch(upLikeBlog(toUpdateBlog))
  }

  const handleDeleteBlog = async (event, toDeleteBlog) => {
    event.preventDefault()

    const confirmMessage = `Remove blog ${toDeleteBlog.title} by ${toDeleteBlog.author}`
    if (window.confirm(confirmMessage)) {
      dispatch(deleteBlog(toDeleteBlog))
    }
  }

  return (
    <Fragment>
      <Notification />
      {!user && (
        <LoginForm
          user={user}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <Fragment>
          <h2>Blog&#39;s {user.name}</h2>

          <LogoutForm user={user} handleLogout={handleLogout} />

          <BlogForm
            handleCreateBlog={handleCreateBlog}
            createBlogVisible={createBlogVisible}
            setCreateBlogVisible={setCreateBlogVisible}
          />

          <Blogs
            blogs={blogs}
            loggedUser={user}
            handleLogout={handleLogout}
            handleCreateBlog={handleCreateBlog}
            handleUpLikeBlog={handleUpLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

export default App
