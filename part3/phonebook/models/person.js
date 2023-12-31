const { connect, Schema, set, default: mongoose } = require('mongoose')

set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('%c⧭', 'color: #aa00ff', { url })

connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (value) => {
        return /^\d{2,3}-\d{6,10}$/.test(value)
      },
      message: (props) =>
        `${props.value} is invalid phone number format! ..valid format ex. 012-33445566`,
    },
  },
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.created_by = 'peemtanapat'
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', phoneBookSchema)
