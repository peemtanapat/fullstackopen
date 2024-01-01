import { createSlice } from '@reduxjs/toolkit'
import { USERS_STAT } from '../constant'
import { getUsers } from '../services/user'

const usersStatSlice = createSlice({
  name: USERS_STAT,
  initialState: [],
  reducers: {
    setUsersStat(state, action) {
      return action.payload
    },
  },
})

export const { setUsersStat } = usersStatSlice.actions

export const loadUsersStat = () => {
  return async (dispatch) => {
    const usersStat = await getUsers()
    dispatch(setUsersStat(usersStat))
  }
}

export default usersStatSlice.reducer
