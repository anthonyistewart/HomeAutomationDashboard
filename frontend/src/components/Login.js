import React, { useState } from 'react'
import axios from 'axios'

import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const signup = async () => {
    const res = await axios.post('/account/login', { username, password })
    if (res.data !== 'User not found') {
      history.push('/')
    } else {
      alert(res.data)
    }
  }

  return (
    <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="font-weight-bold">Log In</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="new-username-form"
              className="form-control"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => signup(username, password, history)}
            >
              Log In
            </button>
          </div>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/signup">Sign Up!</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
