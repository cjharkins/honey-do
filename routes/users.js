const express = require('express')
const router = express.Router()
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')
const moment = require('moment/moment')
// const jwt = require('jsonwebtoken')
// const checkAuth = require('../middleware/checkAuth')

// const PRIVATE_KEY = process.env.PRIVATE_KEY

// Create user
router.post('/users', (req, res) => {
  let user = new User(req.body)

  user.save((err, user) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(`User successfully created`)
  })
})

// Get user
router.get('/users/:id', (req, res) => {
  let query = {_id:req.params.id}

  User.find(query)
    .exec()
      .then(docs =>
        res.status(200).json(docs)
      )
      .catch(err =>
        res.status(500)
          .json({
          message: 'Error finding list',
          error: err,
        })
      )
})

// Delete user
router.delete('/users/:id', (req, res) => {
  const query = { _id: req.params.id }

  User.findOneAndDelete(query, (err, user) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(`User ${req.params.id} successfully deleted`)
  })
})

// Update user
router.put('/users/:id', (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    phone,
    oldPassword,
    newPassword,
  } = req.body

  User.findById(req.params.id)
    .then(oldUser => {
      if (!!oldPassword && !!newPassword) {
        // Update password and profile
        oldUser.comparePassword(oldPassword, (err, isMatch) => {
          if (isMatch) {
            oldUser.firstName = firstName
            oldUser.lastName = lastName
            oldUser.userName = userName
            oldUser.phone = phone
            oldUser.comment = comment
            oldUser.password = newPassword

            oldUser.save((err, user) => {
              if (err) {
                res.status(400).send(err)
              }
              res.status(200).send(`User ${req.params.id} successfully updated`)
            })
          } else {
            res.status(401).send('Incorrect old password')
          }
        })
      } else {
        // Update profile only
        oldUser.firstName = firstName
        oldUser.lastName = lastName
        oldUser.userName = userName
        oldUser.phone = phone
        oldUser.comment = comment

        oldUser.save((err, user) => {
          if (err) {
            res.status(400).send(err)
          }
          res.status(200).send(`User ${req.params.id} successfully updated`)
        })
      }
    })
    .catch(err => {
      res.status(401).send('User not found')
    })
})
//
// // Sign in
// router.post('/auth/signin', function(req, res, next) {
//   User.findOne({ userName: req.body.userName })
//     .then(user => {
//       if (!user) {
//         res.status(404).send('No user found')
//       }
//
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         if (isMatch) {
//           const token = jwt.sign({ userId: user.id }, PRIVATE_KEY, {
//             expiresIn: '1d',
//           })
//
//           res.status(200).json({
//             userId: user.id,
//             token,
//           })
//         } else {
//           res.status(400).json({ message: 'Invalid Password/Username' })
//         }
//       })
//     })
//     .catch(err => {
//       res.status(400).json({ message: 'Invalid Password/Username' })
//     })
// })
//
// router.get('/auth/getUser', checkAuth, (req, res) => {
//   res.status(200).json(req.user)
// })

module.exports = router
