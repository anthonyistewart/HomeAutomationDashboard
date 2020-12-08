const { Schema, model } = require('mongoose')

const deviceTypes = ['light', 'contact', 'energy']

const deviceSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: deviceTypes, required: true },
  devices: [{ type: Number }],
})

module.exports = model('Device', deviceSchema)
