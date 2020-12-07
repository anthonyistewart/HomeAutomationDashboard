import React, { useState, useEffect } from 'react'

const Settings = ({ updateUser, userInfo }) => {
  // const { first, last } = userInfo
  const [firstName, setFirstName] = useState('Anthony')
  const [lastName, setLastName] = useState('Stewart')

  return (
    <div className="modal" id="settingsBox" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">Change your preferences here!</p>

            <div className="form-row">
              <div className="col">
                <label>First Name:</label>
                <input
                  id="new-username-form"
                  className="form-control"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Last Name:</label>
                <input
                  id="new-username-form"
                  className="form-control"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row p-3">
              <label>Widget 1:</label>
              <select className="custom-select">
                <option selected>Select a widget to display</option>
                <option value="1">Power Consumption</option>
                <option value="2">Temperature</option>
                <option value="3">None</option>
              </select>
            </div>

            <div className="form-row p-3">
              <label>Widget 2:</label>
              <select className="custom-select">
                <option selected>Select a widget to display</option>
                <option value="1">Power Consumption</option>
                <option value="2">Temperature</option>
                <option value="3">None</option>
              </select>
            </div>

            <div className="custom-control custom-switch py-3">
              <input type="checkbox" className="custom-control-input" id="customSwitch1" />
              <label className="custom-control-label" for="customSwitch1">Dark Mode</label>
            </div>

          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                console.log('Saved new settings')
                $('#settingsBox').modal('hide')
              }}
            >
              Save
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
