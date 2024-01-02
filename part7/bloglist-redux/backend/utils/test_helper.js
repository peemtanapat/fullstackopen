const User = require('../models/user')
const bcrypt = require('bcrypt')

const INIT_USERNAME = 'peemtanapat'
const INIT_PASSWORD = 'pass4321'
const INIT_NAME = 'Tanapat Choochot'

const usersInDb = async () => {
  const allUsers = await User.find({})

  return allUsers.map((user) => user.toJSON())
}

const getInitUser = async () => {
  const initUser = await User.findOne({ username: INIT_USERNAME })

  return initUser
}

const clearUsers = async () => {
  await User.deleteMany({})
}

const createMockUser = async (
  username = INIT_USERNAME,
  password = INIT_PASSWORD,
  name = INIT_NAME,
) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username: username,
    name: name,
    password: passwordHash,
  })

  const savedUser = await user.save()
  return savedUser._id
}

module.exports = {
  usersInDb,
  getInitUserId: getInitUser,
  createMockUser,
  clearUsers,
  INIT_USERNAME,
  INIT_PASSWORD,
}
