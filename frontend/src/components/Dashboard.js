import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'
import SideBar from './SideBar'
import RoomsView from './RoomsView'
import AdminView from './AdminView'
import HomeView from './HomeView'

const FullPageWrapper = s.div`
  height: 100vh;
`

const Dashboard = ({ userData, isLoggedIn }) => {
  const [currentView, setCurrentView] = useState(0)
  const history = useHistory()

  const logout = async () => {
    await axios.post('/account/logout')
    history.push('/login')
  }

  const updateUser = async data => {
    await axios.post('/account/update', data)
    history.push('/')
  }

  const addRoom = async data => {
    await axios.post('/api/rooms/add', data)
    history.push('/')
  }

  const addDevice = async data => {
    await axios.post('/api/devices/add', data)
    history.push('/')
  }

  return (
    <>
      {(isLoggedIn) && (
        <FullPageWrapper className="container-fluid m-0">
          <div className="row">
            <SideBar
              updateUser={updateUser}
              userData={userData}
              logout={logout}
              setCurrentView={setCurrentView}
            />
            <div className="col">
              {
                (currentView === 0) && (<HomeView userData={userData} />)
              }
              {
                (currentView === 1) && (<RoomsView addRoom={addRoom} addDevice={addDevice} />)
              }
              {
                (currentView === 2) && (<AdminView />)
              }
            </div>
          </div>
        </FullPageWrapper>
      )}
      {(!isLoggedIn) && (
        <Redirect to="/login" />
      )}
    </>
  )
}

export default Dashboard
