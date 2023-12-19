const User = require('../models/user')
const bcrypt = require('bcrypt')

const INIT_USERNAME = 'peemtanapat'
const INIT_PASSWORD = 'pass4321'
const INIT_NAME = 'Tanapat Choochot'

const usersInDb = async () => {
  const allUsers = await User.find({})

  return allUsers.map((user) => user.toJSON())
}

const getInitUserId = async () => {
  const initUser = await User.findOne({ username: INIT_USERNAME })

  return initUser._id.toString()
}

const initFirstUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(INIT_PASSWORD, 10)
  const user = new User({
    username: INIT_USERNAME,
    name: INIT_NAME,
    password: passwordHash,
  })

  const savedUser = await user.save()
  return savedUser._id.toString()
}

module.exports = {
  usersInDb,
  getInitUserId,
  initFirstUser,
  INIT_USERNAME,
  INIT_PASSWORD,
}
