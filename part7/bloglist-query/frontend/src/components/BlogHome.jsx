import { Fragment, useContext } from 'react'

import BlogForm from './BlogForm'
import Blogs from './Blogs'
import LoginForm from './LoginForm'
import UserInfoContext from '../contexts/UserInfoContext'

const BlogHome = () => {
  const [userInfo] = useContext(UserInfoContext)

  return (
    <Fragment>
      {!userInfo && <LoginForm user={userInfo} />}
      {userInfo && (
        <Fragment>
          <BlogForm />

          <Blogs loggedUser={userInfo} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default BlogHome
