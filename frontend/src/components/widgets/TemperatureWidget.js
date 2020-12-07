import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Label } from 'recharts'

const TemperatureWidget = () => {
  const [data, setData] = useState('')

  const getTempText = () => {
    return sampleData[0].temp
  }

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

  return (
    <div className="card">
      <div className="card-body">
        <h5> Temperature </h5>
        <PieChart width={200} height={300}>
          <Pie startAngle={90} endAngle={360} data={sampleData} dataKey="tempDisp" outerRadius={80} innerRadius={50}>
            <Label value={getTempText()} position="center" />
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}

export default TemperatureWidget
