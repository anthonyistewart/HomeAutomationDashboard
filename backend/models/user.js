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
  clearance: {type: Number, default: 2 },
})

module.exports = model('User', userSchema)
