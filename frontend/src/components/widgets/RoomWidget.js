import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Label } from 'recharts'
import plugFill from '../../../assets/plug-fill.svg'
import bulbFill from '../../../assets/bulb-fill.svg'

const RoomWidget = ({ room, addDevice }) => {
  const [devices, setDevices] = useState([])

  const getDevices = async () => {
    const res = await axios.get(`/api/rooms/devices/${room.name}`)
    return res
  }

  const sendMsg = async data => {
    const res = await axios.post('/mqtt/send', data)
    return res
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getDevices().then(res => {
        setDevices(res.data)
        console.log(res.data)
      })
    }, 1000)

    return () => clearInterval(intervalID)
  }, [])

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
          <div className="row py-3  border-bottom">
            <h6>{device.name}</h6>
            <div className="col">
              {(device.type === 'onoff') && (
                <img className="align-middle" src={plugFill} alt="" width="32" height="32" title={device.name} />
              )}
              {(device.type === 'light') && (
                <img className="align-middle" src={bulbFill} alt="" width="32" height="32" title={device.name} />
              )}
            </div>
            <div className="col">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                  <input type="radio" name="options" id={device.mqtt_topic} autoComplete="off" onClick={() => sendMsg({ topic: `${room.topic_root}/${device.mqtt_topic}`, msg: "1" })} />
                  On
                </label>
                <label className="btn btn-secondary">
                  <input type="radio" name="options" id={device.mqtt_topic} autoComplete="off" onClick={() => sendMsg({ topic: `${room.topic_root}/${device.mqtt_topic}`, msg: "0" })} />
                  Off
                </label>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}

export default RoomWidget
