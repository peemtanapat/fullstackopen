import { createSlice } from '@reduxjs/toolkit'
import { USER_INFO } from '../constant'
import { getUser } from '../services/user'

const userInfoSlice = createSlice({
  name: USER_INFO,
  initialState: null,
  reducers: {
    setUserInfo(state, action) {
      return action.payload
    },
  },
})

export const { setUserInfo } = userInfoSlice.actions

export const loadUserInfo = ({ userId }) => {
  return async (dispatch) => {
    const userInfo = await getUser({ userId })
    dispatch(setUserInfo(userInfo))
  }
}

export default userInfoSlice.reducer
