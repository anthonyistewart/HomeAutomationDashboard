import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import personFill from '../../assets/person-fill.svg'

const AdminView = () => {
  const [currentUser, setCurrentUser] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {
    const res = await axios.get('/account/users')
    return res
  }

  const getClearanceLabel = clearance => {
    switch (clearance) {
      case 0:
        return 'Admin'
      case 1:
        return 'Resident'
      case 2:
        return 'Guest'
      default:
        return ''
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getAllUsers().then(res => {
        setAllUsers(res.data)
      })
    }, 1000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="col-10">
      <h4> Users: </h4>
      <ul className="list-group">
        {allUsers.map(user => (
          <li className="list-group-item" key={uuidv4()} style={{ display: 'inline-block' }}>
            <div className="row py-2">
              <div className="col-auto">
                <img src={personFill} alt="" width="32" height="32" title={user.username} />
              </div>
              <div className="col-auto">
                <h6>Username: {user.username}</h6>
              </div>
              <div className="col-auto">
                <h6>First Name: {user.first_name}</h6>
              </div>
              <div className="col-auto">
                <h6>Last Name: {user.last_name}</h6>
              </div>
              <div className="col-auto">
                <h6>Clearance: {getClearanceLabel(user.clearance)}</h6>
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-primary">
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminView
