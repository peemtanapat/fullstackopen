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

const LOGGED_BLOG_APP_USER = 'loggedBlogAppUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState({
    msg: '',
    isError: false,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createdBlog, setCreatedBlog] = useState(null)
  const [updatedBlog, setUpdatedBlog] = useState(null)
  const [deletedBlog, setDeletedBlog] = useState(null)

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [createdBlog, updatedBlog, deletedBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_APP_USER)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUserToken({ loggedUser, token: loggedUser.token })
    }
  }, [])

  const setUserToken = ({ loggedUser, token }) => {
    blogService.setToken(token)
    setUser(loggedUser)
    setUsername('')
    setPassword('')
  }

  const resetUser = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem(LOGGED_BLOG_APP_USER)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    setNotificationMsg({ msg: '' })

    console.log('logging in with', username)

    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        LOGGED_BLOG_APP_USER,
        JSON.stringify(loggedUser),
      )
      setUserToken({ loggedUser, token: loggedUser.token })
    } catch (error) {
      setNotificationMsg({ msg: 'Wrong Username or Password', isError: true })
      setTimeout(() => {
        setNotificationMsg({ msg: '' })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    resetUser()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    try {
      const createdBlog = await blogService.create({ newBlog })
      if (createdBlog.id) {
        setCreatedBlog(createdBlog)
        setNotificationMsg({
          msg: `new blog added : "${createdBlog.title}" by ${createdBlog.author}`,
          isError: false,
        })
      }
    } catch (error) {
      setNotificationMsg({
        msg: `Create blog error: ${pathOr(
          error.message,
          'response.data.error'.split('.'),
          error,
        )}`,
        isError: true,
      })
    }
  }

  const handleUpLikeBlog = async (event, toUpdateBlog) => {
    event.preventDefault()

    const updatedLikeBlog = {
      ...toUpdateBlog,
      likes: toUpdateBlog.likes + 1,
      user: toUpdateBlog.user.id,
    }

    try {
      const updatedBlog = await blogService.update({
        updatedBlog: updatedLikeBlog,
      })
      setUpdatedBlog(updatedBlog)
    } catch (error) {
      setNotificationMsg({
        msg: `Like blog error: ${pathOr(
          error.message,
          'response.data.error'.split('.'),
          error,
        )}`,
        isError: true,
      })
    }
  }

  const handleDeleteBlog = async (event, toDeleteBlog) => {
    console.log('%c⧭', 'color: #f200e2', { toDeleteBlog })
    event.preventDefault()

    const confirmMessage = `Remove blog ${toDeleteBlog.title} by ${toDeleteBlog.author}`
    if (window.confirm(confirmMessage)) {
      try {
        const deletedBlog = await blogService.deleteBlog({
          blogId: toDeleteBlog.id,
        })
        setDeletedBlog(deletedBlog)
      } catch (error) {
        setNotificationMsg({
          msg: `Delete blog error: ${pathOr(
            error.message,
            'response.data.error'.split('.'),
            error,
          )}`,
          isError: true,
        })
      }
    }
  }

  return (
    <Fragment>
      <Notification
        message={notificationMsg.msg}
        isError={notificationMsg.isError}
      />
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
          <h2>Blogs&#39;s {user.name}</h2>

          <LogoutForm user={user} handleLogout={handleLogout} />

          <BlogForm
            handleCreateBlog={handleCreateBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            createBlogVisible={createBlogVisible}
            setCreateBlogVisible={setCreateBlogVisible}
          />

          <Blogs
            blogs={blogs}
            user={user}
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
