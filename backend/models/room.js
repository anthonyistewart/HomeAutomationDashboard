const { Schema, model } = require('mongoose')

const roomSchema = new Schema({
  name: { type: String, required: true },
  topic_root: { type: String, required: true },
  devices: [{ type: Number }],
})

module.exports = model('Room', roomSchema)
