import Blog from './Blog'
import LogoutForm from './LogoutForm'

const Blogs = ({ blogs, user, handleLogout, handleCreateBlog }) => (
  <div>
    <br />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default Blogs
