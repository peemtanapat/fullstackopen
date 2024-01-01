import { ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const BlogHeader = ({ blog }) => {
  return (
    <ListItem>
      <Link to={`/blogs/${blog.id}`}>
        <ListItemText
          primary={`${blog.title}`}
          secondary={blog.author}
        ></ListItemText>
      </Link>
    </ListItem>
  )
}

export default BlogHeader
