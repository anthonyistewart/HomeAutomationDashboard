import React, { useState, useEffect } from 'react'

const NewDevice = ({ addDevice, rooms }) => {
  const [deviceName, setDeviceName] = useState('')
  const [deviceRoom, setDeviceRoom] = useState('')
  const [deviceType, setDeviceType] = useState(1)
  const [mqttTopic, setMqttTopic] = useState('')

  return (
    <div className="modal" id="newDeviceBox" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Device</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">Add a new device.</p>

            <div className="form-group">
              <label>Device Name:</label>
              <input
                id="device-name"
                className="form-control"
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Device Room:</label>
              <select
                className="form-control"
                id="device-room"
              >
                {(rooms.map(room => (
                  <option>{room.name}</option>
                )))}
              </select>
            </div>

            <label>Device Type:</label>
            <div className="form-check form-check-inline">
              <input
                name="typeRadio"
                id="device-type1"
                className="form-control"
                type="radio"
                value="light"
              />
              <label htmlFor="device-type1">Light</label>
            </div>
            <div className="form-check">
              <input
                name="typeRadio"
                id="device-type2"
                className="form-control"
                type="radio"
                value="onoff"
              />
              <label htmlFor="device-type2">On Off</label>
            </div>

            <div className="form-group">
              <label>Device MQTT Topic:</label>
              <input
                id="device-topic"
                className="form-control"
                value={mqttTopic}
                onChange={e => setMqttTopic(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addDevice({
                  name: deviceName,
                  room: $('#device-room option:selected').text(),
                  type: $('input:radio[name=typeRadio]:checked').val(),
                  mqtt_topic: mqttTopic,
                })
                console.log('Added New Device')
                $('#newDeviceBox').modal('hide')
              }}
            >
              Save
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewDevice
