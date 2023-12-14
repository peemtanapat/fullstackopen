// mongoose: object document mapper (ODM)
// The idea behind Mongoose is that the data stored in the database is given a schema at the level of the application that defines the shape of the documents stored in any given collection.
const {
  connect,
  connection,
  model,
  Schema,
  set,
} = require('mongoose')

console.log({ argv: process.argv })

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const username = encodeURIComponent('peemtanapat')
const password = encodeURIComponent(process.argv[2])
const cluster = 'cluster0'

const url = `mongodb+srv://${username}:${password}@${cluster}.qsomtrp.mongodb.net/?retryWrites=true&w=majority`
console.log('%c⧭', 'color: #00a3cc', { url })

set('strictQuery', false)
connect(url)

const phoneBookSchema = new Schema({
  name: String,
  number: String,
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.created_by = 'peemtanapat'
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = model('Person', phoneBookSchema)

// adding new person with command-line
// e.g. $ `node mongo.js yourpassword Anna 040-1234556`
const newName = process.argv[3]
const newNumber = process.argv[4]

try {
  if (newName && newNumber) {
    const person = new Person({
      name: newName,
      number: newNumber,
    })

    person.save().then(() => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      connection.close()
    })
  }
} finally {
  Person.find({}).then((res) => {
    console.log('Phonebook List:')
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
  })
}

module.exports = { Person }
