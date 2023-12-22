import Blog from './Blog'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = ({ blogs, user, handleUpLikeBlog }) => (
  <div>
    <br />
    {blogs.sort(sortBlogFn).map((blog) => (
      <Blog key={blog.id} blog={blog} handleUpLikeBlog={handleUpLikeBlog} />
    ))}
  </div>
)

export default Blogs
