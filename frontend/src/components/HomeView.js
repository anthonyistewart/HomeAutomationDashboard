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
        {(userData.widget_1 === 1) && (
          <div className="col-auto">
            <EnergyWidget />
          </div>
        )}
        {(userData.widget_1 === 2) && (
          <div className="col-auto">
            <TemperatureWidget />
          </div>
        )}
        {(userData.widget_2 === 1) && (
          <div className="col-auto">
            <EnergyWidget />
          </div>
        )}
        {(userData.widget_2 === 2) && (
          <div className="col-auto">
            <TemperatureWidget />
          </div>
        )}
      </div>
    </>
  )
}

export default HomeView
