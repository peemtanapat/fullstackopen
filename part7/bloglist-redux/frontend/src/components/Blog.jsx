import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewComment,
  deleteBlog,
  loadBlogList,
  upLikeBlog,
} from '../reducers/blogListReducer'
import blogListService from '../services/blogs'
import { Demo } from './Custom'
import useUserState from '../hooks/useUserState'
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const blogId = params.id

  const user = useUserState()
  const singleBlog = useSelector((state) => state.singleBlog)
  const [finalBlog, setFinalBlog] = useState(null)

  const blogs = useSelector((state) => state.blogList)

  useEffect(() => {
    if (!finalBlog) {
      const foundBlog = blogs.find((blog) => blog.id === blogId)
      setFinalBlog(foundBlog)
    } else {
      setFinalBlog(singleBlog)
    }
  }, [singleBlog, blogs])

  if (!finalBlog) return null

  return (
    <div>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/`}
        onClick={() => dispatch(loadBlogList())}
      >
        <Typography fontSize={18} fontWeight="bold" data-cy="blog-title">
          {finalBlog.title} by {finalBlog.author}
        </Typography>
      </Link>
      <BlogDetail blog={finalBlog} loggedUser={user} />
    </div>
  )
}

const BlogDetail = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()

  return (
    <div data-cy="blog-detail">
      <ul>
        <Typography>URL: {blog.url}</Typography>
        <Typography data-cy="blog-like-info">
          Likes: {blog.likes}{' '}
          <IconButton
            color="warning"
            size="small"
            data-cy="button-like-blog"
            onClick={(event) => {
              dispatch(upLikeBlog(blog, true))
            }}
          >
            <FavoriteIcon />
            Like
          </IconButton>
        </Typography>
        <Typography>Admin: {blog.user.name}</Typography>
      </ul>
      {blogListService.isBlogOwner({ loggedUser, blog }) && (
        <RemoveBlogButton blog={blog} />
      )}
      <BlogComments blog={blog} />
      <br />
    </div>
  )
}

const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    dispatch(addNewComment(blog, comment))
    setComment('')
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
      onSubmit={addComment}
    >
      <InputBase
        type="text"
        id="comment"
        name="comment"
        label="comment"
        data-testid="input-comment"
        data-cy="input-comment"
        variant="standard"
        sx={{ ml: 1, flex: 1 }}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        size="small"
        aria-label="add"
        type="submit"
        data-testid="button-submit-comment"
        data-cy="button-submit-comment"
        sx={{ p: '10px' }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Paper>
  )
}

const BlogComments = ({ blog }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography
        fontSize={16}
        sx={{ mt: 4, mb: 2 }}
        variant="h6"
        component="div"
      >
        Comments
      </Typography>
      <BlogCommentForm blog={blog} />

      <Demo>
        {blog.comments?.map((comment, index) => {
          return <List key={index}>{comment}</List>
        })}
      </Demo>
    </Grid>
  )
}

const RemoveBlogButton = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteBlog = async (event) => {
    event.preventDefault()

    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(confirmMessage)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  return (
    <form
      onSubmit={(event) => {
        handleDeleteBlog(event)
      }}
    >
      <Button
        variant="contained"
        color="inherit"
        size="small"
        type="submit"
        data-cy="button-remove-blog"
      >
        remove
      </Button>
    </form>
  )
}

export default Blog
