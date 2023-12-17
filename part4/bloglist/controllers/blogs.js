const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await blog.find({})

  return res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const foundBlog = await blog.findById(id)

  if (foundBlog) {
    return res.json(blog)
  } else {
    return res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const newBlog = new blog({
    title,
    author,
    url,
    likes: likes || 0,
  })

  const savedBlog = await newBlog.save()

  return res.status(201).json(savedBlog)
})

module.exports = blogsRouter
