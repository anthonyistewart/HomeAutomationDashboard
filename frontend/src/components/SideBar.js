import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import s from 'styled-components'
import axios from 'axios'
//import Upload from './Upload'
import Settings from './Settings'

const Wrapper = s.div`
  border-right: 1px solid #d3d3d3;
`

const LeftSideBar = s.ul`
  position: sticky;
  top:0;
  height: calc(100vh - 70px);
`

const SideBar = ({ setCurrentView }) => {
  const [name, setName] = useState('')
  const [clearance, setClearance] = useState(-1)

  const whoIsActive = async () => {
    const res = await axios.get('/account/active')
    return res
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      whoIsActive().then(res => {
        setName(res.data.username)
        setClearance(res.data.clearance)
        console.log(res.data)
      })
    }, 1000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <Settings />
      <Wrapper className="col-2 bg-light p-0">
        <LeftSideBar className="nav nav-pills flex-column">
          <div className="nav-item border-bottom text-center pt-3">
            <h6 className="text-center">Welcome {name}!</h6>
          </div>
          <li className="nav-item border-bottom">
            <a
              className="nav-link text-center"
              href="#/"
              onClick={e => {
                e.preventDefault()
                setCurrentView(0)
              }}
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item border-bottom">
            <a
              className="nav-link text-center"
              href="#/"
              onClick={e => {
                e.preventDefault()
                setCurrentView(1)
              }}
            >
              My Rooms
            </a>
          </li>
          <li className="nav-item border-bottom">
            <a
              className="nav-link text-center"
              href="#/"
              onClick={e => {
                e.preventDefault()
                setCurrentView(2)
              }}
            >
              My Household
            </a>
          </li>
          <li className="nav-item border-bottom">
            <a className="nav-link text-center" href="#/" data-toggle="modal" data-target="#settingsBox">Settings</a>
          </li>
        </LeftSideBar>
      </Wrapper>
    </>
  )
}

export default SideBar
