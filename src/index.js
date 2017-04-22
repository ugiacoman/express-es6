import express from 'express'
import logger from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
const debug = require('debug')('dev')
// import routes from './routes'

const app = express()
app.disable('x-powered-by')
app.use(compression())

// View engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, '../public')))

// Routes
// app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    })
})

const { PORT = 8080 } = process.env
app.listen(PORT, () => debug(`Listening on port ${PORT}`))
