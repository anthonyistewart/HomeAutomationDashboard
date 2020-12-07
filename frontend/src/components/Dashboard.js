import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import SideBar from './SideBar'
import RoomsView from './RoomsView'
import AdminView from './AdminView'
import HomeView from './HomeView'

const FullPageWrapper = s.div`
  height: 100vh;
`

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [clearance, setClearance] = useState('')
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

  const whoIsActive = async () => {
    const res = await axios.get('/account/active')
    return res
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      whoIsActive().then(res => {
        setCurrentUser(res.data.username)
        setClearance(res.data.clearance)
        console.log('Updated User Info')
      })
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <FullPageWrapper className="container-fluid m-0">
      <div className="row">
        <SideBar
          updateUser={updateUser}
          logout={logout}
          setCurrentView={setCurrentView}
        />
        <div className="col">
          {
            (currentView === 0) && (<HomeView />)
          }
          {
            (currentView === 1) && (<RoomsView />)
          }
          {
            (currentView === 2) && (<AdminView />)
          }
        </div>
      </div>
    </FullPageWrapper>
  )
}

export default Dashboard
