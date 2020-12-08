const express = require('express')

const Room = require('../models/room')
const Device = require('../models/device')
const isAuthenticated = require('../../middlewares/isAuthenticated')

const router = express.Router()

router.get('/rooms', isAuthenticated, async (req, res) => {
  try {
    const rooms = await Room.find()
    res.send(rooms)
  } catch (err) {
    res.send(`Failed to get rooms - ${err}`)
  }
})

router.post('/rooms/add', isAuthenticated, async (req, res) => {
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

module.exports = router
