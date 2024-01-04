import { Fragment, useContext, useState } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { BLOGS } from '../constant'
import NotificationContext from '../contexts/NotificationContext'

const BlogForm = () => {
  const [, noticeDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const allBlogs = queryClient.getQueryData([BLOGS])
      queryClient.setQueryData([BLOGS], allBlogs.concat(newBlog))
    },
    onError: (error, vars) => {
      noticeDispatch({
        payload: {
          text: `'${vars?.newBlog?.title}' : ${
            error.response?.data?.error || ''
          }`,
          isError: true,
        },
      })
    },
  })

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    newBlogMutation.mutate({ newBlog })
    noticeDispatch({
      payload: {
        text: `Added ${newBlog.title} by ${newBlog.author}`,
      },
    })
  }

  return (
    <Fragment>
      <div style={hideWhenVisible}>
        <Button
          data-testid="button-new-blog"
          data-cy="button-new-blog"
          variant="contained"
          onClick={() => setCreateBlogVisible(true)}
        >
          Create New Blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Box component="form" onSubmit={createBlog} style={showWhenVisible}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12} item={true}>
              <TextField
                label="Title"
                size="small"
                type="text"
                id="title"
                name="title"
                data-testid="input-title"
                data-cy="input-title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Grid>
            <Grid xs={12} item={true}>
              <TextField
                label="Author"
                type="text"
                size="small"
                id="author"
                name="author"
                data-testid="input-author"
                data-cy="input-author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Grid>

            <Grid xs={12} item={true}>
              <TextField
                label="URL"
                type="text"
                size="small"
                id="url"
                name="url"
                data-testid="input-url"
                data-cy="input-url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </Grid>
            <Grid xs={12} item={true}>
              <Button
                variant="contained"
                type="submit"
                data-testid="button-submit-blog"
                data-cy="button-submit-blog"
              >
                Create
              </Button>
              <Button
                color="inherit"
                onClick={() => setCreateBlogVisible(false)}
              >
                Hide
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default BlogForm
