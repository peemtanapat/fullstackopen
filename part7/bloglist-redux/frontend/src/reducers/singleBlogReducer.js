import { createSlice } from '@reduxjs/toolkit'
import { SINGLE_BLOG } from '../constant'
import blogListService from '../services/blogs'

const singleBlogSlice = createSlice({
  name: SINGLE_BLOG,
  initialState: null,
  reducers: {
    setSingleBlog(state, action) {
      return action.payload
    },
  },
})

export const { setSingleBlog } = singleBlogSlice.actions

export const loadSingleBlog = (blogId) => {
  return async (dispatch) => {
    const blog = await blogListService.getBlog({ blogId })
    dispatch(setSingleBlog(blog))
  }
}

export default singleBlogSlice.reducer
