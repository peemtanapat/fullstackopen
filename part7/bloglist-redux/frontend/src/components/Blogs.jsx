import Blog from './Blog'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = ({ blogs, loggedUser, handleUpLikeBlog, handleDeleteBlog }) => (
  <div>
    <br />
    {blogs.sort(sortBlogFn).map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        loggedUser={loggedUser}
        handleUpLikeBlog={handleUpLikeBlog}
        handleDeleteBlog={handleDeleteBlog}
      />
    ))}
  </div>
)

export default Blogs
