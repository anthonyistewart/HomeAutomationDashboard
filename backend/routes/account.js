const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username, password }, async (err, user, next) => {
    if (err) {
      next(err)
    }

    if (user) {
      res.send('User Already Exists')
    } else {
      try {
        await User.create({
          username,
          password,
        })
        res.send('User Created')
      } catch (e) {
        res.send(`Failed to Create User - ${e}`)
      }
    }
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user, next) => {
    if (err) {
      next(err)
    }
    if (user) {
      req.session.username = username
      req.session.clearance = user.clearance
      req.session.first_name = user.first_name
      req.session.last_name = user.last_name
      console.log(req.session)
      res.send(req.session.username)
    } else {
      res.send('User not found')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.clearance = -1
  req.session.first_name = ''
  req.session.last_name = ''
  res.send('Logged Out')
})

router.post('/update', isAuthenticated, (req, res) => {
  const { username, password, clearance } = req.session
  const { userToEdit, first_name, last_name, widget_1, widget_2 } = req.body

  const newSettings = { first_name, last_name, widget_1, widget_2 }

  // Updating another user
  if (userToEdit !== username) {
    // Needs to be an Admin
    if (clearance === 0) {
      User.findOneAndUpdate({ username: userToEdit }, newSettings, (err, user, next) => {
        if (err) {
          next(err)
        }
        res.send('Update Successful')
      })
    } else {
      res.send('Access Denied')
    }
  } else {
    User.findOneAndUpdate({ username }, newSettings, (err, user, next) => {
      if (err) {
        next(err)
      }
      res.send('Update Successful')
    })
  }
})

router.get('/active', (req, res) => {
  const { username } = req.session
  User.findOne({ username }, (err, user, next) => {
    if (err) {
      next(err)
    }
    if (user) {
      res.send({
        username,
        clearance: user.clearance,
        first_name: user.first_name,
        last_name: user.last_name,
        widget_1: user.widget_1,
        widget_2: user.widget_2,
      })
    } else {
      res.send('')
    }
  })
})

router.get('/users', isAuthenticated, async (req, res) => {
  const { username, clearance } = req.session
  // Must be an Admin
  if (clearance === 0) {
    const users = await User.find()
    res.send(users)
  } else {
    res.send('Access Denied')
  }
})

module.exports = router
