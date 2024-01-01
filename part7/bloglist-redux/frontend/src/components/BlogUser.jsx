import { Fragment, useEffect } from 'react'
import { loadUsersStat } from '../reducers/usersStatReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useUserState from '../hooks/useUserState'
import { NoAuthorization } from './ErrorPage'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </TableHead>
          <TableBody>
            {usersStat.map((stat) => {
              const createdBlogAmount = stat.blogs.length
              return (
                <TableRow key={stat.id}>
                  <TableCell>
                    <Link to={`/users/${stat.id}`}>{stat.name}</Link>
                  </TableCell>

                  <TableCell id="textCenter">{createdBlogAmount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default BlogUser
