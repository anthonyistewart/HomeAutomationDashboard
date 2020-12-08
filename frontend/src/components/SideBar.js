import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import s from 'styled-components'
import axios from 'axios'
import Settings from './Settings'
import exit from '../../assets/exit.svg'
import houseFill from '../../assets/house-fill.svg'
import gearFill from '../../assets/gear-fill.svg'
import gridFill from '../../assets/grid-1x2-fill.svg'
import lockFill from '../../assets/lock-fill.svg'

const Wrapper = s.div`
  border-right: 1px solid #d3d3d3;
  height: 100vh;
`

const LeftSideBar = s.ul`
  position: sticky;
  top:0;
  height: calc(100vh - 70px);
`

const SideBar = ({ updateUser, userData, logout, setCurrentView }) => {
  const [name, setName] = useState('')
  const [clearance, setClearance] = useState(0)

  return (
    <>
      <Settings updateUser={updateUser} userData={userData} />
      <Wrapper className="col-auto bg-light">
        <div className="row text-center py-3">
          <div className="col-auto">
            <a
              href="#/"
              onClick={e => {
                e.preventDefault()
                setCurrentView(0)
              }}
            >
              <img src={houseFill} alt="" width="32" height="32" title="Home" />
            </a>
          </div>
        </div>
        <div className="row text-center py-3">
          <div className="col-auto">
            <a
              href="#/"
              onClick={e => {
                e.preventDefault()
                setCurrentView(1)
              }}
            >
              <img src={gridFill} alt="" width="32" height="32" title="Rooms" />
            </a>
          </div>
        </div>
        {
          (clearance === 0) && (
            <div className="row text-center py-3">
              <div className="col-auto">
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault()
                    setCurrentView(2)
                  }}
                >
                  <img src={lockFill} alt="" width="32" height="32" title="Users" />
                </a>
              </div>
            </div>
          )
        }
        <div className="row text-center py-3">
          <div className="col-auto">
            <a
              href="#/"
              data-toggle="modal"
              data-target="#settingsBox"
            >
              <img src={gearFill} alt="" width="32" height="32" title="Settings" />
            </a>
          </div>
        </div>
        <div className="row text-center py-3">
          <div className="col-auto">
            <a
              href="#/"
              onClick={() => logout()}
            >
              <img src={exit} alt="" width="32" height="32" title="Log Out" />
            </a>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default SideBar
