import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, XAxis, YAxis, Area } from 'recharts'

const EnergyWidget = () => {
  const [data, setData] = useState('')

  const sampleData = [
    {
      kWh: 20,
    },
    {
      kWh: 25,
    },
    {
      kWh: 30,
    },
    {
      kWh: 25,
    },
    {
      kWh: 10,
    },
    {
      kWh: 10,
    },
    {
      kWh: 15,
    },
    {
      kWh: 20,
    },
    {
      kWh: 20,
    },
    {
      kWh: 20,
    },
  ]

  return (
    <div className="card">
      <div className="card-body">
        <h5> Power Consumption </h5>
        <AreaChart width={500} height={300} data={sampleData}>
          <XAxis />
          <YAxis />
          <Area dataKey="kWh" />
        </AreaChart>
      </div>
    </div>
  )
}

export default EnergyWidget
