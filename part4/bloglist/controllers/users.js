const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const user = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const allUsers = await user
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })

  return res.json(allUsers)
})

usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const foundUser = await user.findById(id).populate('blogs')

  if (foundUser) {
    return res.json(user)
  } else {
    return res.status(404).end()
  }
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password required at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new user({
    username,
    name,
    password: passwordHash,
  })

  const savedUser = await newUser.save()

  return res.status(201).json(savedUser)
})

module.exports = usersRouter
