import { ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const BlogHeader = ({ blog }) => {
  return (
    <ListItem>
      <Link to={`/blogs/${blog.id}`}>
        <ListItemText
          primary={`${blog.title}`}
          secondary={blog.author}
          data-cy="blog-headline"
        />
      </Link>
    </ListItem>
  )
}

export default BlogHeader
