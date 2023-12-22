import React from 'react'
import { Fragment, useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, handleUpLikeBlog, handleDeleteBlog }) => {
  const [viewDetailVisible, setViewDetailVisible] = useState(false)
  const hideWhenDetailVisible = viewDetailVisible
    ? { display: 'none' }
    : { display: '' }
  const showWhenDetailVisible = viewDetailVisible
    ? { display: '' }
    : { display: 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button
        style={hideWhenDetailVisible}
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
          visible={showWhenDetailVisible}
          handleUpLikeBlog={handleUpLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  )
}

const BlogDetail = ({ blog, visible, handleUpLikeBlog, handleDeleteBlog }) => {
  return (
    <Fragment>
      <div style={visible}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>
            Likes: {blog.likes}{' '}
            <button
              onClick={(event) => {
                handleUpLikeBlog(event, blog)
              }}
            >
              like
            </button>
          </li>
          <li>Admin: {blog.user.name}</li>
        </ul>
        <RemoveBlogButton blog={blog} handleDeleteBlog={handleDeleteBlog} />
      </div>
    </Fragment>
  )
}

const RemoveBlogButton = ({ blog, handleDeleteBlog }) => {
  return (
    <form
      onSubmit={(event) => {
        handleDeleteBlog(event, blog)
      }}
    >
      <button type="submit">remove</button>
    </form>
  )
}

export default Blog
