require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// takes the JSON data of a request, transforms it into a JavaScript object
// then attaches it to the body property of the request object
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Backend Home</h1>')
})

app.get('/info', (req, res) => {
  Person.count().then((count) => {
    const phoneBookCount = `Phonebook has info for ${count} people`
    const dateTime = new Date().toISOString()
    const result = `<div>
        <p>${phoneBookCount}</p>
        <p>${dateTime}</p>
      </div>`

    res.send(result)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((allPersons) => {
    res.json(allPersons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (!person) {
        res.send(404).end()
      } else {
        res.json(person)
      }
    })
    .catch((error) => {
      console.log('getPersonById', error)
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const newData = req.body

  if (!newData.name || !newData.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  Person.find({})
    .then((allPersons) => {
      const duplicatedName = allPersons.find(
        (p) => p.name.toLowerCase() === newData.name.toLowerCase()
      )

      if (duplicatedName) {
        return personFindByIdAndUpdate({
          id: duplicatedName.id,
          number: newData.number,
        })
          .then((updatedPerson) => {
            res.json(updatedPerson)
          })
          .catch((error) => {
            return next(error)
          })
      }

      const newPerson = {
        name: newData.name,
        number: newData.number,
      }

      Person.create(newPerson)
        .then((savedNewPerson) => {
          res.json(savedNewPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => {
      console.log('createError:find', error)
      next(error)
    })
})

const personFindByIdAndUpdate = ({ id, name, number }) => {
  return Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
}

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  personFindByIdAndUpdate({ id, name, number })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).json({ error: 'not found specific id' })
      }
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error({ errorName: error.name, errorMessage: error.message })

  if (error.name === 'CastError') {
    const personId = req.url.split('/').pop()
    return res.status(400).send({ error: `malformatted id: ${personId}` })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
