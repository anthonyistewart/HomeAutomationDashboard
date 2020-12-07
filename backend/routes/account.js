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
      req.session.password = password
      req.session.clearance = user.clearance
      console.log(req.session)
      res.send(req.session.username)
    } else {
      res.send('User not found')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  req.session.clearance = -1
  res.send('Logged Out')
})

router.post('/update', isAuthenticated, (req, res) => {
  const { username, password, clearance } = req.session
  const { userToEdit } = req.body

  // Updating another user
  if (userToEdit !== username) {
    // Needs to be an Admin
    if (clearance === 0) {
      User.findOne({ username: userToEdit }, (err, user, next) => {
        if (err) {
          next(err)
        }
        if (user) {
          // Edit User Here
          res.send('Update Successful')
        } else {
          res.send('User not found')
        }
      })
    } else {
      res.send('Access Denied')
    }
  } else {
    User.findOne({ username }, (err, user, next) => {
      if (err) {
        next(err)
      }
      if (user) {
        // Edit User Here (not clearance)
        res.send('Update Successful')
      } else {
        res.send('User not found')
      }
    })
  }
})

router.get('/active', (req, res) => {
  res.send({
    username: req.session.username,
    clearance: req.session.clearance,
  })
})

module.exports = router
