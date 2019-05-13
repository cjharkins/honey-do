require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const usersRouter = require('./routes/users')
const listRouter = require('./routes/lists')
const taskRouter = require('./routes/tasks')
// const jwt = require('jsonwebtoken')
const User = require('./models/User')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// const PRIVATE_KEY = process.env.PRIVATE_KEY
const DB_HOST = process.env.DB_HOST

// Attach user to every request if one is found
// app.use((req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]
//
//     jwt.verify(token, PRIVATE_KEY, function(err, payload) {
//       if (payload) {
//         User.findById(payload.userId).then(doc => {
//           if (doc) {
//             const user = Object.assign({}, doc.toObject())
//             delete user.password
//             delete user.__v
//             req.user = user
//             next()
//           } else {
//             next()
//           }
//         })
//       } else {
//         next()
//       }
//     })
//   } catch (e) {
//     next()
//   }
// })

app.use('/api', usersRouter)
app.use('/api', listRouter)
app.use('/api', taskRouter)

app.get('/healthCheck', (req, res) => {
  res.status(200).end()
})

mongoose.connect('mongodb://' + DB_HOST + '/honey-do', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')

  app.listen(3000, () => {
    console.log('API Server Listening on port ' + 3000)
  })
})

module.exports = app
