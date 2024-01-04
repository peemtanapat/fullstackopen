import { Fragment, useContext, useMemo } from 'react'
import { List } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { BLOGS, RETRY_QUERY_TIMES } from '../constant'
import BlogHeader from './BlogHeader'
import blogService from '../services/blogs'
import UserInfoContext from '../contexts/UserInfoContext'

const sortBlogFn = (blogA, blogB) => {
  return blogB.likes - blogA.likes
}

const Blogs = () => {
  const [userInfo] = useContext(UserInfoContext)

  const {
    isLoading,
    isError,
    fetchStatus,
    data: blogs,
  } = useQuery({
    queryKey: [BLOGS],
    queryFn: blogService.getAll,
    retry: RETRY_QUERY_TIMES,
    refetchOnWindowFocus: false,
  })

  const renderedBlogs = useMemo(() => {
    if (!blogs) return null

    const copied = [...blogs]
    return copied.sort(sortBlogFn)
  }, [blogs])

  if (!userInfo) return null

  const toDisplayLoading = isLoading && fetchStatus !== 'idle'
  if (toDisplayLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return (
      <div>anecdote service not available due to problems in server side</div>
    )
  }

  if (!renderedBlogs) return null

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

export default Blogs
