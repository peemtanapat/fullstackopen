require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())

app.use(express.json())

app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
