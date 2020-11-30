import React, { useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import SideBar from './components/SideBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import RoomsView from './components/RoomsView'
import HouseholdView from './components/HouseholdView'
import DashboardView from './components/DashboardView'

const App = () => {
  const [currentView, setCurrentView] = useState(0)
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
          <div className="container-fluid w-100 h-100">
            <div className="row">
              <SideBar
                setCurrentView={setCurrentView}
                />
                {
                  (currentView == 0) && (<DashboardView />)
                }
                {
                  (currentView == 1) && (<RoomsView />)
                }
                {
                  (currentView == 2) && (<HouseholdView />)
                }
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
