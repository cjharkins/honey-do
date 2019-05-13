const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
  },
  { toJSON: { virtuals: true } }
)

// userSchema.pre(
//   'save',
//   function(next) {
//     const user = this
//
//     if (!user.isModified('password')) {
//       return next()
//     }
//
//     bcrypt.hash(user.password, 10).then(hashedPassword => {
//       user.password = hashedPassword
//       next()
//     })
//   },
//   function(err) {
//     next(err)
//   }
// )
//
// userSchema.methods.comparePassword = function(candidatePassword, next) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return next(err)
//     next(null, isMatch)
//   })
// }

// userSchema.virtual('fullName').get(function() {
//   return this.firstName + ' ' + this.lastName
// })

module.exports = mongoose.model('User', userSchema)
