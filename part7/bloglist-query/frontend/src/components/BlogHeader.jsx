import { useContext } from 'react'
import { Button, IconButton, ListItem, ListItemText } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FavoriteIcon from '@mui/icons-material/Favorite'

import blogService from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'
import { BLOGS } from '../constant'

const BlogHeader = ({ blog }) => {
  const queryClient = useQueryClient()
  const [, noticeDispatch] = useContext(NotificationContext)

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      console.log('%c⧭', 'color: #00bf00', { updatedBlog })
      queryClient.invalidateQueries({ queryKey: [BLOGS] })
    },
    onError: (error, vars) => {
      noticeDispatch({
        payload: {
          text: `'${vars.content}' : ${error.response?.data?.error || ''}`,
          isError: true,
        },
      })
    },
  })

  const likeBlog = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    likeBlogMutation.mutate({ updatedBlog })
    noticeDispatch({
      payload: { text: `liked ${updatedBlog.title}` },
    })
  }

  return (
    <ListItem>
      <ListItemText
        primary={`${blog.title}`}
        secondary={blog.author}
        data-cy="blog-headline"
      />
      <IconButton
        color="warning"
        size="small"
        data-cy="button-like-blog"
        onClick={likeBlog}
      >
        <FavoriteIcon />
        Like
      </IconButton>
      <RemoveBlogButton blog={blog} />
    </ListItem>
  )
}

const RemoveBlogButton = ({ blog }) => {
  const queryClient = useQueryClient()
  const [, noticeDispatch] = useContext(NotificationContext)

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      console.log('%c⧭', 'color: #00bf00', { deletedBlog })
      queryClient.invalidateQueries({ queryKey: [BLOGS] })
    },
    onError: (error, vars) => {
      noticeDispatch({
        payload: {
          text: `blogId '${vars.blogId}' : ${
            error.response?.data?.error || ''
          }`,
          isError: true,
        },
      })
    },
  })

  const handleDeleteBlog = async (event) => {
    event.preventDefault()

    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(confirmMessage)) {
      removeBlogMutation.mutate({ blogId: blog.id })
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

export default BlogHeader
