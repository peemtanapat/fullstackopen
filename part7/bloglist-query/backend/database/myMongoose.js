const myMongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

console.log({ MONGODB_URI })

myMongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

module.exports = myMongoose
