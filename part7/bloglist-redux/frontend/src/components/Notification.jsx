import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import '../css/index.css'

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
