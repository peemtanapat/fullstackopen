import React, { Fragment } from 'react'
import '../css/index.css'

const Notification = ({ message, isError }) => {
  if (!message) return <Fragment></Fragment>

  const msgClassType = isError ? 'error' : 'success'
  return (
    <Fragment>
      <div className="notice">
        <div className={msgClassType}>{message}</div>
      </div>
    </Fragment>
  )
}

export default Notification
