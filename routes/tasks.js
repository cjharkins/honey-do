const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const moment = require('moment/moment')


/* GET task */
router.get('/tasks/:id', (req, res) => {
  let query = { _id: req.params.id }
  Task.find(query)
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding tasks',
        error: err,
      })
    )
})

/* GET all tasks */
router.get('/tasks', (req, res) => {
  Task.find()
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding tasks by publisher',
        error: err,
      })
    )
})

/* GET tasks by user */
router.get('/tasks', (req, res) => {
  let query = { publisher: req.query.publisher }
  Task.find(query)
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding tasks by publisher',
        error: err,
      })
    )
})

/* GET tasks by list */
router.get('/tasks', (req, res) => {
  let query = { list: req.query.list }
  Task.find(query)
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding tasks by list',
        error: err,
      })
    )
})

// Create task
router.post('/tasks', (req, res) => {
  let task = new Task(req.body)
  task.save((err, task) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(`Task successfully created as ` + task)
  })
})

/* PUT task */
router.put('/tasks/:id', (req, res) => {
  let query = { _id: req.params.id }

  Task.update(query, req.body, (err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).json(doc)
  })
})

/* DELETE task */
router.delete('/tasks/:id', (req, res) => {
  let query = { _id: req.params.id }

  Task.findOneAndDelete(query, (err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).json(doc)
  })
})

/* GET tasks by date */
router.get('/tasks/date', (req, res) => {
  const date = req.query.date

  try {
    const dateMoment = moment(date)

    if (!dateMoment.isValid()) {
      res.status(400).send('Error with provided date')
    }

    const query = {
      date: {
        $gte: dateMoment.startOf('day').toISOString(),
        $lte: dateMoment.endOf('day').toISOString(),
      },
    }

    Task.find(query)
      .populate('users')
      .populate('lists')
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding tasks',
          error: err,
        })
      )
  } catch (err) {
    return res.status(500).send('Error with provided date')
  }
})

module.exports = router
