import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TemperatureWidget from './widgets/TemperatureWidget'
import EnergyWidget from './widgets/EnergyWidget'

const HomeView = ({ userData }) => {
  const x = 1

  return (
    <>
      <h3>
        Welcome
        {' '}
        {(userData.first_name === '') ? userData.username : userData.first_name}
        {'!'}
      </h3>
      <div className="row p-5">
        <div className="col-auto">
          <TemperatureWidget />
        </div>
        <div className="col-auto">
          <EnergyWidget />
        </div>
      </div>
    </>
  )
}

export default HomeView
