import { createSlice } from '@reduxjs/toolkit'

import { NOTIFICATION } from '../constant'
import { logAction } from '../utils/logger'

const notificationSlice = createSlice({
  name: NOTIFICATION,
  initialState: '',
  reducers: {
    pushNotification(state, action) {
      logAction(state, action)
      return action.payload
    },
  },
})

export const { pushNotification } = notificationSlice.actions

export const resetNotification = (seconds = 5) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(pushNotification({ message: '' }))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
