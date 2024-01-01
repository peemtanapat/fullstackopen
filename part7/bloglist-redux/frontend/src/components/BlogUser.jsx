import { Fragment, useEffect } from 'react'
import { loadUsersStat } from '../reducers/usersStatReducer'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useUserState from '../hooks/useUserState'
import { NoAuthorization } from './ErrorPage'

const BlogUser = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogList)

  useEffect(() => {
    dispatch(loadUsersStat())
  }, [blogs])

  const user = useUserState()
  const usersStat = useSelector((state) => state.usersStat)

  if (!user) return <NoAuthorization />
  if (!usersStat) return null

  return (
    <Fragment>
      <h2>Users' Stat</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {usersStat.map((stat) => {
            const createdBlogAmount = stat.blogs.length
            return (
              <tr key={stat.id}>
                <td>
                  <Link to={`/users/${stat.id}`}>{stat.name}</Link>
                </td>

                <TdCenter>{createdBlogAmount}</TdCenter>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Fragment>
  )
}

const TdCenter = styled.td`
  text-align: center;
`

export default BlogUser
