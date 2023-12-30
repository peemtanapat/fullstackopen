const myMongoose = require('../database/myMongoose')

const blogSchema = new myMongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: myMongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = myMongoose.model('Blog', blogSchema)
