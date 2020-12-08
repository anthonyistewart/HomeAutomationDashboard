import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'

const App = () => {
  const [userData, setUserData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const whoIsActive = async () => {
    const res = await axios.get('/account/active')
    return res
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      whoIsActive().then(res => {
        if (res.data !== '') {
          setIsLoggedIn(true)
          setUserData(res.data)
        } else {
          setIsLoggedIn(false)
        }
      })
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Dashboard userData={userData} isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
