import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DashboardView = () => {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div className="col-10">
      <p> Dashboard! </p>
    </div>
  )
}

export default DashboardView
