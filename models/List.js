const mongoose = require('mongoose')

const Schema = mongoose.Schema

let listSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    subscribers: { type: Array },
    content: { type: Array },
    title: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
)

const List = mongoose.model('List', listSchema)

module.exports = List
