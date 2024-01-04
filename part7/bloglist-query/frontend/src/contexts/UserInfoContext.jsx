import { createContext, useReducer } from 'react'
import userInfoReducer from '../reducers/userInfoReducer'
import loginService from '../services/login'

const UserInfoContext = createContext()

export const UserInfoContextProvider = (props) => {
  const [userInfo, userInfoDispatch] = useReducer(
    userInfoReducer,
    loginService.getLoggedUser(),
  )

  return (
    <UserInfoContext.Provider value={[userInfo, userInfoDispatch]}>
      {props.children}
    </UserInfoContext.Provider>
  )
}

export default UserInfoContext
