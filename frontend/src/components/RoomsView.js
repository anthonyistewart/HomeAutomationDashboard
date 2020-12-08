import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RoomWidget from './widgets/RoomWidget'
import NewRoom from './NewRoom'

const RoomsView = ({ addRoom }) => {
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
      <div className="row p-5">
        {(rooms.map(room => (
          <div className="col-auto">
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
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomsView
