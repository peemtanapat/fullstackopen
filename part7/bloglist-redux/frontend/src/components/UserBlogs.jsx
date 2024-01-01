import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUserInfo } from '../reducers/userInfoReducer'
import BlogHeader from './BlogHeader'
import { UnorderedList } from './Custom'

const UserBlogs = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const userId = params.id

  const userInfo = useSelector((state) => state.userInfo)

  useEffect(() => {
    dispatch(loadUserInfo({ userId }))
  }, [userId])

  if (!userId || !userInfo) return null

  return (
    <Fragment>
      <h2>{userInfo.name}</h2>
      <h3>Added Blogs</h3>
      <UnorderedList>
        {userInfo.blogs.map((blog) => {
          return BlogHeader({ blog })
        })}
      </UnorderedList>
    </Fragment>
  )
}

export default UserBlogs
