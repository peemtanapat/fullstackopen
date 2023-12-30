import { createSlice } from '@reduxjs/toolkit'
import { BLOG_LIST } from '../constant'
import blogListService from '../services/blogs'
import { logAction } from '../utils/logger'
import { pushNotification, resetNotification } from './notificationReducer'

const blogListReducer = createSlice({
  name: BLOG_LIST,
  initialState: [],
  reducers: {
    setBlogList(state, action) {
      logAction(state, action)
      const blogList = action.payload
      return blogList
    },
    addNewBlog(state, action) {
      logAction(state, action)
      return state.concat(action.payload)
    },
  },
})

export const { setBlogList, addNewBlog, increaseLikeBlog } =
  blogListReducer.actions

export const loadBlogList = () => {
  return async (dispatch) => {
    const allBlogList = await blogListService.getAll()
    dispatch(setBlogList(allBlogList))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogListService.create({ newBlog })
      dispatch(addNewBlog(createdBlog))
      dispatch(
        pushNotification({
          message: `new blog added "${createdBlog.title}" by ${createdBlog.author}`,
          isError: false,
        }),
      )
      dispatch(resetNotification())
    } catch (error) {
      pushNotification({
        message: `Create blog error: ${pathOr(
          error.message,
          'response.data.error'.split('.'),
          error,
        )}`,
        isError: true,
      })
    }
  }
}

export const upLikeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedLikeBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      const updatedBlog = await blogListService.update({
        updatedBlog: updatedLikeBlog,
      })
      dispatch(loadBlogList())
      dispatch(
        pushNotification({
          message: `you liked "${updatedBlog.title}" by ${updatedBlog.author}`,
          isError: false,
        }),
      )
      dispatch(resetNotification())
    } catch (error) {
      pushNotification({
        message: `Like blog error: ${pathOr(
          error.message,
          'response.data.error'.split('.'),
          error,
        )}`,
        isError: true,
      })
      dispatch(resetNotification())
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const deletedBlog = await blogListService.deleteBlog({
        blogId: blog.id,
      })
      dispatch(loadBlogList())
      dispatch(
        pushNotification({
          message: `deleted "${deletedBlog.title}" by ${deletedBlog.author}`,
          isError: false,
        }),
      )
      dispatch(resetNotification())
    } catch (error) {
      pushNotification({
        message: `Delete blog error: ${pathOr(
          error.message,
          'response.data.error'.split('.'),
          error,
        )}`,
        isError: true,
      })
      dispatch(resetNotification())
    }
  }
}

export default blogListReducer.reducer
