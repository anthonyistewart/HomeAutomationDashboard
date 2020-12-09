import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Label } from 'recharts'

const RoomWidget = ({ room }) => {
  const [devices, setDevices] = useState(room.devices)

  const sampleData = [
    {
      temp: 67,
      tempDisp: Math.round(100 * (67 / 90)),
    },
    {
      temp: 90 - 67,
      tempDisp: 100 - Math.round(100 * (67 / 90)),
      fill: '#F8F8F8',
    },
  ]

  const getTempText = () => `${sampleData[0].temp}°F`

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log(devices)
    }, 1000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="card">
      <div className="card-body">
        <h5>{ room.name }</h5>

        <div className="row p-2 border-bottom">
          <div className="col">
            <PieChart width={200} height={300}>
              <Pie startAngle={90} endAngle={450} data={sampleData} dataKey="tempDisp" outerRadius={80} innerRadius={50}>
                <Label value={getTempText()} position="center" />
              </Pie>
            </PieChart>
          </div>
        </div>
        {(devices.map(device => (
          <div className="row p-2">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active">
                <input type="radio" name="options" id={device.mqtt_topic} autoComplete="off" onClick={() => console.log(`${device.name}-on`)} />
                On
              </label>
              <label className="btn btn-secondary">
                <input type="radio" name="options" id={device.mqtt_topic} autoComplete="off" onClick={() => console.log(`${device.name}-off`)} />
                Off
              </label>
            </div>

          </div>
        )))}
      </div>
    </div>
  )
}

export default RoomWidget
