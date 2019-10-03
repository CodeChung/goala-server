const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const actionsRouter = require('./actions/actions-router')
const authRouter = require('./auth/auth-router')
const blocksRouter = require('./blocks/blocks-router')
// const countsRouter = require('./counts/counts-router')
const entriesRouter = require('./entries/entries-router')
const goalsRouter = require('./goals/goals-router')
const logsRouter = require('./logs/logs-router')
const remindersRouter = require('./reminders/reminders-router')
const usersRouter = require('./users/users-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use('/api/actions', actionsRouter)
app.use('/api/auth', authRouter)
app.use('/api/blocks', blocksRouter)
// app.use('/api/counts', countsRouter)
app.use('/api/entries', entriesRouter)
app.use('/api/goals', goalsRouter)
app.use('/api/logs', logsRouter)
app.use('/api/reminders', remindersRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'server error' }
  } else {
    console.error(error)
    response = { error: error.message, details: error }
  }
  res.status(500).json(response)
})

module.exports = app
