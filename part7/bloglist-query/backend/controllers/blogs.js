const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })

  return res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const foundBlog = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1,
  })

  if (foundBlog) {
    return res.json(foundBlog)
  } else {
    return res.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes, comments } = req.body

  const user = req.user
  const userForReturn = {
    username: user.username,
    name: user.name,
  }

  const newBlogObj = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
    comments,
  }

  const newBlog = new Blog(newBlogObj)

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  newBlogObj.id = savedBlog._id.toString()
  newBlogObj.user = userForReturn

  return res.status(201).json(newBlogObj)
})

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const blogId = req.params.id
  const newComment = req.body.comment

  const targetBlog = await Blog.findById(blogId)

  targetBlog.comments.push(newComment)
  await targetBlog.save()

  const updatedBlog = await Blog.findById(blogId).populate('user', {
    username: 1,
    name: 1,
  })

  return res.status(200).json(updatedBlog)
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const id = req.params.id
  const updatedBlogInfo = req.body

  const result = await Blog.findOneAndUpdate({ _id: id }, updatedBlogInfo, {
    returnOriginal: false,
  })
  return res.json(result)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const id = req.params.id
  const foundBlog = await Blog.findOne({ _id: id })

  if (foundBlog.user.toString() !== user.id) {
    return res.status(401).json({ error: 'Unauthorized: not the creator' })
  }

  const result = await Blog.findOneAndDelete({ _id: id })
  // pull(remove) blog from user.blogs as well
  user.blogs.pull(id)
  await user.save()

  return res.json(result)
})

module.exports = blogsRouter
