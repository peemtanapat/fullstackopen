import React from 'react'
import { useSelector } from 'react-redux'

import '../css/index.css'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  if (!message) return null

  const msgClassType = isError ? 'error' : 'success'
  return (
    <Alert className={msgClassType} severity={msgClassType}>
      {message}
    </Alert>
  )
}

export default Notification
