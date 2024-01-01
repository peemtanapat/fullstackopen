import { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BlogHeader from './BlogHeader'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = ({ loggedUser }) => {
  const userState = useSelector((state) => state.user)
  console.log('%c⧭', 'color: #7f7700', { loggedUser, userState })

  const blogs = useSelector((state) => state.blogList)

  const renderedBlogs = useMemo(() => {
    const copied = [...blogs]
    return copied.sort(sortBlogFn)
  }, [blogs])

  if (!loggedUser) return null
  if (!blogs) return null

  return (
    <Fragment>
      <br />
      <UnorderedList>
        {renderedBlogs.map((blog) => (
          <BlogHeader key={blog.id} blog={blog} />
        ))}
      </UnorderedList>
    </Fragment>
  )
}

const UnorderedList = styled.ul`
  list-style-type: none;
`

export default Blogs
