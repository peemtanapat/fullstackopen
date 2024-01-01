import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewComment,
  deleteBlog,
  upLikeBlog,
} from '../reducers/blogListReducer'
import blogListService from '../services/blogs'
import { UnorderedList } from './Custom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = () => {
  const params = useParams()
  const blogId = params.id

  const userState = useSelector((state) => state.user)
  const singleBlog = useSelector((state) => state.singleBlog)
  const [finalBlog, setFinalBlog] = useState(null)

  const blogs = useSelector((state) => state.blogList)

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

      <BlogComments blog={blog} />
    </div>
  )
}

const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    dispatch(addNewComment(blog, comment))
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <label htmlFor="comment">Comment:</label>
        <br />
        <input
          type="text"
          id="comment"
          name="comment"
          data-testid="input-comment"
          data-cy="input-comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          type="submit"
          data-testid="button-submit-comment"
          data-cy="button-submit-comment"
        >
          Add comment
        </button>
      </form>
    </div>
  )
}

const BlogComments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <BlogCommentForm blog={blog} />
      <UnorderedList>
        {blog.comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </UnorderedList>
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
