import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Label } from 'recharts'

const TemperatureWidget = () => {
  const [data, setData] = useState('')
  const [currentRoom, setCurrentRoom] = useState(0)

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
        <h5> Temperature </h5>
        <div className="row">

          <div className="col align-self-center">
            <ul className="list-unstyled">
              <li>
                <a
                  href="#/"
                >
                  Living Room
                </a>
              </li>
              <li>
                <a
                  href="#/"
                >
                  Dining Room
                </a>
              </li>
              <li>
                <a
                  href="#/"
                >
                  Kitchen
                </a>
              </li>
              <li>
                <a
                  href="#/"
                >
                  Bedroom
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <PieChart width={200} height={300}>
              <Pie startAngle={90} endAngle={450} data={sampleData} dataKey="tempDisp" outerRadius={80} innerRadius={50}>
                <Label value={getTempText()} position="center" />
              </Pie>
            </PieChart>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TemperatureWidget
