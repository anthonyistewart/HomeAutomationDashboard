const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
// const influx = require('influx')

const AccountRouter = require('./routes/account')
// const MqttRouter = require('./routes/mqtt')
const MqttHandler = require('./mqtt_handler')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ha-dashboard'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const mqttHandler = new MqttHandler()
// mqttHandler.connect()

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use('/account', AccountRouter)

app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(`${err}`)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
