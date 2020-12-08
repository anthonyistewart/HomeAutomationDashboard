const express = require('express')

const User = require('../models/user')
const MqttHandler = require('../mqtt_handler')
const isAuthenticated = require('../../middlewares/isAuthenticated')

const router = express.Router()
const mqttHandler = new MqttHandler()
mqttHandler.connect()

router.post('/send', (req, res) => {
  console.log(req.body)
  const { topic, msg } = req.body
  mqttHandler.send(topic, msg)
  res.send('success')
})

module.exports = router
