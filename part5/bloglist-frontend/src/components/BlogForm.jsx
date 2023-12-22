import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreateBlog,
  createBlogVisible,
  setCreateBlogVisible,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    handleCreateBlog({ newBlog })
  }

  return (
    <Fragment>
      <h2>Create new</h2>
      <div style={hideWhenVisible}>
        <button
          data-testid="button-new-blog"
          onClick={() => setCreateBlogVisible(true)}
        >
          new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createBlog} style={showWhenVisible}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            data-testid="input-title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <label htmlFor="author">Author:</label>
          <br />
          <input
            type="text"
            id="author"
            name="author"
            data-testid="input-author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <label htmlFor="url">Url:</label>
          <br />
          <input
            type="text"
            id="url"
            name="url"
            data-testid="input-url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit" data-testid="button-submit-blog">
            Create
          </button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </Fragment>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  createBlogVisible: PropTypes.bool.isRequired,
  setCreateBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm
