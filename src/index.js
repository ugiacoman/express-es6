import express from 'express'
import logger from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import apiRoutes from '../routes/api'

const debug = require('debug')('dev')

const app = express()
app.disable('x-powered-by')
app.use(compression())
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/', apiRoutes)

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Alertness Pro Server' })
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    })
})

const { PORT = 8080 } = process.env
app.listen(PORT, () => debug(`Listening on port ${PORT}`))
