import { useContext, useReducer } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const notificationStyle = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
}

const Notification = () => {
  const [message, noticeDispatch] = useContext(NotificationContext)

  if (!message) return null

  setTimeout(() => {
    // notification is displayed for five seconds
    noticeDispatch({ payload: '' })
  }, 5000)

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
