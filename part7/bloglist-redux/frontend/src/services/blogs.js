import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlog = async ({ blogId }) => {
  const request = await axios.get(`${baseUrl}/${blogId}`)
  return request.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async ({ newBlog }) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const addComment = async ({ blog, comment }) => {
  const blogId = blog.id
  const commentBody = {
    comment,
  }
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentBody,
    config,
  )

  return res.data
}

const update = async ({ updatedBlog }) => {
  const config = {
    headers: { Authorization: token },
  }

  const urlWithBlogId = `${baseUrl}/${updatedBlog.id}`

  const res = await axios.put(urlWithBlogId, updatedBlog, config)
  return res.data
}

const deleteBlog = async ({ blogId }) => {
  const config = {
    headers: { Authorization: token },
  }

  const urlWithBlogId = `${baseUrl}/${blogId}`

  const res = await axios.delete(urlWithBlogId, config)
  return res.data
}

const isBlogOwner = ({ loggedUser, blog }) => {
  return loggedUser.username === blog.user.username
}

export default {
  getAll,
  getBlog,
  create,
  addComment,
  update,
  deleteBlog,
  setToken,
  isBlogOwner,
}
