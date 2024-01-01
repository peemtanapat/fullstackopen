import { Fragment } from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import LoginForm from './LoginForm'
import useUserState from '../hooks/useUserState'

const BlogHome = () => {
  const user = useUserState()

  return (
    <Fragment>
      {!user && <LoginForm user={user} />}
      {user && (
        <Fragment>
          <BlogForm />

          <Blogs loggedUser={user} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default BlogHome
