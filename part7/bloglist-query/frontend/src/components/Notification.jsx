import { Alert } from '@mui/material'
import { useContext } from 'react'

import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const [message, noticeDispatch] = useContext(NotificationContext)

  if (!message.text) return null

  setTimeout(() => {
    noticeDispatch({ payload: { text: '' } })
  }, 5000)

  const msgClassType = message.isError ? 'error' : 'success'

  return (
    <Alert className={msgClassType} severity={msgClassType}>
      {message.text}
    </Alert>
  )
}

export default Notification
