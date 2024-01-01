import { Link } from 'react-router-dom'

const BlogHeader = ({ blog }) => {
  return (
    <li>
      <Link to={`/blogs/${blog.id}`}>
        <h4 data-cy="blog-headline">
          {blog.title} by {blog.author}
        </h4>
      </Link>
    </li>
  )
}

export default BlogHeader
