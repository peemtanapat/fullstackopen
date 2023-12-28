const notificationStyle = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
}

const Notification = ({ notification, setNotification }) => {
  if (!notification) return null

  setTimeout(() => {
    // notification is displayed for five seconds
    setNotification('')
  }, 5000)

  return <div style={notificationStyle}>{notification}</div>
}

export default Notification
