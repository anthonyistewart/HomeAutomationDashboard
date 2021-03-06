const { Schema, model } = require('mongoose')

const deviceTypes = ['light', 'onoff']

const deviceSchema = new Schema({
  name: { type: String, required: true },
  room: { type: String, required: true },
  type: { type: String, enum: deviceTypes, required: true },
  mqtt_topic: { type: String, required: true },
})

module.exports = model('Device', deviceSchema)
