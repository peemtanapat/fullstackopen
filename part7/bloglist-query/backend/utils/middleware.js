const jwt = require('jsonwebtoken')

const { getTokenFrom } = require('./jwt_helper')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error({ errorName: error.name, errorMessage: error.message })

  if (error.name === 'CastError') {
    const personId = req.url.split('/').pop()
    return res.status(400).send({ error: `malformatted id: ${personId}` })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const extractedToken = getTokenFrom(req)
  req.token = extractedToken
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const foundUser = await User.findById(decodedToken.id)

  if (!foundUser) {
    return res.status(404).json({ error: 'Not Found specific userId' })
  }

  req.user = foundUser

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
