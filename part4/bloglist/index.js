require('dotenv').config({ path: __dirname + '/.env' })

const { PORT } = require('./utils/config')
const app = require('./app')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
