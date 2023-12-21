import { Fragment } from 'react'

const BlogForm = ({
  handleCreateBlog,
  setTitle,
  setAuthor,
  setUrl,
  createBlogVisible,
  setCreateBlogVisible,
}) => {
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  return (
    <Fragment>
      <h2>Create new</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleCreateBlog} style={showWhenVisible}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <label htmlFor="author">Author:</label>
          <br />
          <input
            type="text"
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <label htmlFor="url">Url:</label>
          <br />
          <input
            type="text"
            id="url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit">Create</button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </Fragment>
  )
}

export default BlogForm
