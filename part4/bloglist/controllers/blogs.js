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
  const foundBlog = await Blog.findById(id)

  if (foundBlog) {
    return res.json(foundBlog)
  } else {
    return res.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  const user = req.user

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)

  user.save()

  return res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const id = req.params.id
  const updatedBlogInfo = req.body

  const foundBlog = await Blog.findOne({ _id: id })

  if (foundBlog.user.toString() !== user.id) {
    return res.status(401).json({ error: 'Unauthorized: not the creator' })
  }

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
  return res.json(result)
})

module.exports = blogsRouter
