import Blog from './Blog'
import LogoutForm from './LogoutForm'

const Blogs = ({ blogs, user, handleUpLikeBlog }) => (
  <div>
    <br />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} handleUpLikeBlog={handleUpLikeBlog} />
    ))}
  </div>
)

export default Blogs
