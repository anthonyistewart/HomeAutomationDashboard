import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Label } from 'recharts'

const RoomWidget = ({ room }) => {
  const [devices, setDevices] = useState([])

  return (
    <div className="card">
      <div className="card-body">
        <h5>{ room.name }</h5>
      </div>
    </div>
  )
}

export default RoomWidget
