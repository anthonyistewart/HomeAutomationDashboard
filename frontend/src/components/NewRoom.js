import React, { useState, useEffect } from 'react'

const NewRoom = ({ addRoom }) => {
  const [roomName, setRoomName] = useState('')
  const [roomTopic, setRoomTopic] = useState('')
  const [roomDevices, setRoomDevices] = useState([])

  return (
    <div className="modal" id="newRoomBox" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Room</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">Change your preferences here!</p>

            <div className="form-group">
              <label>Room Name:</label>
              <input
                id="new-username-form"
                className="form-control"
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Room MQTT Topic:</label>
              <input
                id="new-username-form"
                className="form-control"
                value={roomTopic}
                onChange={e => setRoomTopic(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addRoom({
                  name: roomName,
                  topic_root: roomTopic,
                  devices: roomDevices,
                })
                console.log('Added New Room')
                $('#newRoomBox').modal('hide')
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

export default NewRoom
