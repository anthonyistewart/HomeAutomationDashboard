import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import RoomWidget from './widgets/RoomWidget'
import NewRoom from './NewRoom'
import NewDevice from './NewDevice'

const RoomsView = ({ addRoom, addDevice }) => {
  const [rooms, setRooms] = useState([])

  const getRooms = async () => {
    const res = await axios.get('/api/rooms')
    return res
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getRooms().then(res => {
        setRooms(res.data)
      })
    }, 1000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="col-10">
      <NewRoom addRoom={addRoom} />
      <NewDevice addDevice={addDevice} rooms={rooms} />
      <div className="row p-5">
        {(rooms.map(room => (
          <div className="col-auto" key={uuidv4}>
            <RoomWidget room={room} />
          </div>
        )))}
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary pull-right"
            data-toggle="modal"
            data-target="#newRoomBox"
          >
            Add Room
          </button>
          <button
            type="button"
            className="btn btn-danger pull-right"
            data-toggle="modal"
            data-target="#newDeviceBox"
          >
            Add Device
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomsView
