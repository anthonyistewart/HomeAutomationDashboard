import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TemperatureWidget from './widgets/TemperatureWidget'
import EnergyWidget from './widgets/EnergyWidget'

const HomeView = () => {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div className="row p-5">
      <div className="col-auto">
        <TemperatureWidget />
      </div>
      <div className="col-auto">
        <EnergyWidget />
      </div>
    </div>
  )
}

export default HomeView
