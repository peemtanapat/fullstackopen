import { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BlogHeader from './BlogHeader'
import useUserState from '../hooks/useUserState'
import { List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = () => {
  const user = useUserState()

  const blogs = useSelector((state) => state.blogList)

  const renderedBlogs = useMemo(() => {
    const copied = [...blogs]
    return copied.sort(sortBlogFn)
  }, [blogs])

  if (!user) return null
  if (!blogs) return null

  return (
    <Fragment>
      <br />
      <List>
        {renderedBlogs.map((blog) => (
          <BlogHeader key={blog.id} blog={blog} />
        ))}
      </List>
    </Fragment>
  )
}

const UnorderedList = styled.ul`
  list-style-type: none;
`

export default Blogs
