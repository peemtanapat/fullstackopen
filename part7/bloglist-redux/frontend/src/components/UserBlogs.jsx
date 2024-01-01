import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUserInfo } from '../reducers/userInfoReducer'
import BlogHeader from './BlogHeader'
import { Demo, UnorderedList } from './Custom'
import useUserState from '../hooks/useUserState'
import { Grid, Typography } from '@mui/material'
import { NoAuthorization } from './ErrorPage'

const UserBlogs = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const userId = params.id

  const user = useUserState()
  const userInfo = useSelector((state) => state.userInfo)

  useEffect(() => {
    dispatch(loadUserInfo({ userId }))
  }, [userId])

  if (!user) return <NoAuthorization />

  if (!userId || !userInfo) return null

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {userInfo.name}'s Added Blogs
      </Typography>
      <Demo>
        {userInfo.blogs.map((blog) => (
          <BlogHeader key={blog.id} blog={blog} />
        ))}
      </Demo>
    </Grid>
  )
}

export default UserBlogs
