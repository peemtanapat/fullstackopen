const myMongoose = require('../database/myMongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new myMongoose.Schema({
  username: {
    type: String,
    validate: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
    minLength: 3,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: myMongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

module.exports = myMongoose.model('User', userSchema)
