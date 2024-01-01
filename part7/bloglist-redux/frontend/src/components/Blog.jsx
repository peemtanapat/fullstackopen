import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, upLikeBlog } from '../reducers/blogListReducer'
import blogListService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()

  const params = useParams()
  const blogId = params.id

  const userState = useSelector((state) => state.user)
  const singleBlog = useSelector((state) => state.singleBlog)
  const [finalBlog, setFinalBlog] = useState(null)

  const blogs = useSelector((state) => state.blogList)

  // const finalBlog = useMemo(() => {
  //   return blogs.find((blog) => blog.id === blogId)
  // }, [blogs])

  useEffect(() => {
    if (!finalBlog) {
      const foundBlog = blogs.find((blog) => blog.id === blogId)
      setFinalBlog(foundBlog)
    } else {
      setFinalBlog(singleBlog)
    }
  }, [singleBlog, blogs])

  if (!finalBlog) return null

  return (
    <div style={blogStyle}>
      <span data-cy="blog-headline">
        <Link to={`/`}>
          {finalBlog.title} by {finalBlog.author}
        </Link>
      </span>
      <BlogDetail blog={finalBlog} loggedUser={userState} />
    </div>
  )
}

const BlogDetail = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()

  return (
    <div data-cy="blog-detail">
      <ul>
        <li>URL: {blog.url}</li>
        <li data-cy="blog-like-info">
          Likes: {blog.likes}{' '}
          <button
            data-cy="button-like-blog"
            onClick={(event) => {
              dispatch(upLikeBlog(blog, true))
            }}
          >
            like
          </button>
        </li>
        <li>Admin: {blog.user.name}</li>
      </ul>

      {blogListService.isBlogOwner({ loggedUser, blog }) && (
        <RemoveBlogButton blog={blog} />
      )}
    </div>
  )
}

const RemoveBlogButton = ({ blog }) => {
  const handleDeleteBlog = async (event) => {
    event.preventDefault()

    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(confirmMessage)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <form
      onSubmit={(event) => {
        handleDeleteBlog(event)
      }}
    >
      <button type="submit" data-cy="button-remove-blog">
        remove
      </button>
    </form>
  )
}

export default Blog
