import { useContext } from 'react'

import BlogHome from './components/BlogHome'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import UserInfoContext from './contexts/UserInfoContext'

function App() {
  const [userInfo] = useContext(UserInfoContext)

  return (
    <>
      <Notification />
      {userInfo && <LogoutForm />}
      <BlogHome />
    </>
  )
}

export default App
