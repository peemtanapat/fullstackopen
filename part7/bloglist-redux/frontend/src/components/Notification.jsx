import React from 'react'
import { useSelector } from 'react-redux'

import '../css/index.css'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  if (!message) return null

  const msgClassType = isError ? 'error' : 'success'
  return (
    <div className="notice">
      <div className={msgClassType}>{message}</div>
    </div>
  )
}

export default Notification
