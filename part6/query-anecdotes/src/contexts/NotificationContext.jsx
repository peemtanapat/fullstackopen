import { createContext, useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, noticeDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[message, noticeDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
