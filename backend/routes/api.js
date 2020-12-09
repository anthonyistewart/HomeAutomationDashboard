const express = require('express')

const Room = require('../models/room')
const Device = require('../models/device')
const isAuthenticated = require('../../middlewares/isAuthenticated')

const router = express.Router()

// Get all rooms
router.get('/rooms', isAuthenticated, async (req, res) => {
  try {
    const rooms = await Room.find()
    res.send(rooms)
  } catch (err) {
    res.send(`Failed to get rooms - ${err}`)
  }
})

// Get devices in a room
router.get('/rooms/devices/:room', isAuthenticated, async (req, res) => {
  const { room } = req.params
  try {
    const rooms = await Room.find()
    res.send(rooms)
  } catch (err) {
    res.send(`Failed to get rooms - ${err}`)
  }
})

// Create new room
router.post('/rooms/add', async (req, res) => {
  const { username, clearance } = req.session
  const { name, topic_root, devices } = req.body
  if (clearance === 0) {
    Room.findOne({ name }, async (err, room, next) => {
      if (err) {
        next(err)
      }

      if (room) {
        res.send('Room Already Exists')
      } else {
        try {
          await Room.create({
            name,
            topic_root,
            devices,
          })
          res.send('Room Created')
        } catch (e) {
          res.send(`Failed to Create Room - ${e}`)
        }
      }
    })
  } else {
    res.send('Access Denied')
  }
})

// Add device to room
router.post('/rooms/add-device', async (req, res) => {
  const { name, device } = req.body

  try {
    Room.findOneAndUpdate({ name }, { $push: { devices: device } }, async (err, room, next) => {
      if (err) {
        next(err)
      }
      res.send('Added device')
    })
  } catch (err) {
    res.send(`Failed to add device - ${err}`)
  }
})

router.post('/devices/add', async (req, res) => {
  const { device_id, name, type, mqtt_topic } = req.body

  Device.findOne({ name }, async (err, device, next) => {
    if (err) {
      next(err)
    }

    if (device) {
      res.send('Device already exists')
    } else {
      try {
        await Device.create({
          device_id,
          name,
          type,
          mqtt_topic,
        })
        res.send('Added Device')
      } catch (e) {
        res.send(`Failed to add device = ${e}`)
      }
    }
  })
})

module.exports = router
