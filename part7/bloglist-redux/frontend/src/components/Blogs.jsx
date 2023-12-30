import { Fragment, useMemo } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, upLikeBlog } from '../reducers/blogListReducer'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = ({ loggedUser }) => {
  const dispatch = useDispatch()

  if (!loggedUser) return null

  const blogs = useSelector((state) => state.blogList)

  if (!blogs) return null

  const renderedBlogs = useMemo(() => {
    const copied = [...blogs]
    return copied.sort(sortBlogFn)
  }, [blogs])

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
      <br />
      {renderedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={loggedUser}
          handleUpLikeBlog={handleUpLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </Fragment>
  )
}

export default Blogs
