const mqtt = require('mqtt')

class MqttHandler {
  constructor() {
    this.client = null
    this.host = ''
    this.auth = false // Set to true and add username and password if authentication required
    this.username = ''
    this.password = ''
  }

  connect() {
    // Connect to mqtt server
    if (this.auth) {
      this.client = mqtt.connect(this.host, {
        username: this.username,
        password: this.password,
      })
    } else {
      this.client = mqtt.connect(this.host)
    }

    // mqtt error calback
    this.client.on('error', err => {
      console.log(err)
      this.client.end()
    })

    // connection callback
    this.client.on('connect', () => {
      console.log('mqtt client connected')
    })

    // mqtt subscriptions
    this.client.subscribe('mytopic', { qos: 0 })

    // Log all new messages
    this.client.on('message', (topic, message) => {
      console.log(message.toString())
    })

    this.client.on('close', () => {
      console.log('mqtt client disconnected')
    })
  }

  send(topic, message) {
    this.client.publish(topic, message)
  }
}

module.exports = MqttHandler
