const mongoose = require('mongoose')

const Schema = mongoose.Schema

let taskSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'List',
      required: true,
    },
    title: { type: String, required: true },
    notes: { type: String },
    quantity: { type: Number, required: true },
    completedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    completedOn: { type: Date }
  },
  { toJSON: { virtuals: true } }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
