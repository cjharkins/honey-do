const express = require('express')
const router = express.Router()
const List = require('../models/List')
const moment = require('moment/moment')

// const PRIVATE_KEY = process.env.PRIVATE_KEY

/* GET lists */
router.get('/lists', (req, res) => {
  List.find()
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding list',
        error: err,
      })
    )
})

/* GET list by user */
router.get('/lists/:id', (req, res) => {
  let query = { publisher: req.params.id }
  List.find( query)
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>
      res.status(500).json({
        message: 'Error finding list',
        error: err,
      })
    )
})

// Create list
router.post('/lists', (req, res) => {
  let list = new List(req.body)
  console.log(list)
  list.save((err, list) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(`List successfully created as ` + list)
  })
})

/* PUT list */
router.put('/lists/:id', (req, res) => {
  let query = { _id: req.params.id }

  List.update(query, req.body, (err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).json(doc)
  })
})

/* DELETE list */
router.delete('/lists/:id', (req, res) => {
  let query = { _id: req.params.id }

  List.findOneAndDelete(query, (err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).json(doc)
  })
})

/* GET lists by date */
router.get('/lists/date', (req, res) => {
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

    List.find(query)
      .populate('user')
      .populate('tasks')
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: 'Error finding lists',
          error: err,
        })
      )
  } catch (err) {
    return res.status(500).send('Error with provided date')
  }
})

module.exports = router
