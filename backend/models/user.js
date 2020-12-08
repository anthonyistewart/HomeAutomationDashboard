const { Schema, model } = require('mongoose')

/* Clearance levels:
 * Admin -  0
 * Resident - 1
 * Guest - 2
 *
*/

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  clearance: {
    type: Number,
    min: 0,
    max: 2,
    default: 2,
  },
  first_name: { type: String, required: false, default: '' },
  last_name: { type: String, required: false, default: '' },
})

module.exports = model('User', userSchema)
