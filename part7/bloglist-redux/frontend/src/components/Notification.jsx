import React, { Fragment } from 'react'
import '../css/index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

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
