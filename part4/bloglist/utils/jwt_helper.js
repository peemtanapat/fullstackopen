const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization?.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

module.exports = { getTokenFrom }
