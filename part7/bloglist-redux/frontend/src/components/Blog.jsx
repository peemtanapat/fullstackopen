import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, loggedUser, handleUpLikeBlog, handleDeleteBlog }) => {
  const [viewDetailVisible, setViewDetailVisible] = useState(false)
  const hideWhenDetailVisible = viewDetailVisible
    ? { display: 'none' }
    : { display: '' }
  const showWhenDetailVisible = viewDetailVisible
    ? { display: '' }
    : { display: 'none' }

  return (
    <div style={blogStyle}>
      <span data-cy="blog-headline">
        {blog.title} by {blog.author}
      </span>
      <button
        style={hideWhenDetailVisible}
        data-cy="button-view-blog"
        onClick={() => setViewDetailVisible(true)}
      >
        view
      </button>
      <button
        style={showWhenDetailVisible}
        onClick={() => setViewDetailVisible(false)}
      >
        hide
      </button>
      {viewDetailVisible && (
        <BlogDetail
          blog={blog}
          loggedUser={loggedUser}
          visible={showWhenDetailVisible}
          handleUpLikeBlog={handleUpLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  )
}

const BlogDetail = ({
  blog,
  loggedUser,
  visible,
  handleUpLikeBlog,
  handleDeleteBlog,
}) => {
  return (
    <div style={visible} data-cy="blog-detail">
      <ul>
        <li>URL: {blog.url}</li>
        <li data-cy="blog-like-info">
          Likes: {blog.likes}{' '}
          <button
            data-cy="button-like-blog"
            onClick={(event) => {
              handleUpLikeBlog(event, blog)
            }}
          >
            like
          </button>
        </li>
        <li>Admin: {blog.user.name}</li>
      </ul>

      {blogService.isBlogOwner({ loggedUser, blog }) && (
        <RemoveBlogButton blog={blog} handleDeleteBlog={handleDeleteBlog} />
      )}
    </div>
  )
}

const RemoveBlogButton = ({ blog, handleDeleteBlog }) => {
  return (
    <form
      onSubmit={(event) => {
        handleDeleteBlog(event, blog)
      }}
    >
      <button type="submit" data-cy="button-remove-blog">
        remove
      </button>
    </form>
  )
}

export default Blog
