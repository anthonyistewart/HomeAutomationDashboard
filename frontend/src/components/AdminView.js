import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AdminView = () => {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div className="col-10">
      <p> Admin! </p>
    </div>
  )
}

export default AdminView
