const { Schema, model } = require('mongoose')

const deviceTypes = ['light', 'onoff']

const deviceSchema = new Schema({
  device_id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: deviceTypes, required: true },
  mqtt_topic: { type: String, required: true },
})

module.exports = model('Device', deviceSchema)
