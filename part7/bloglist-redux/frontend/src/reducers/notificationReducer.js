import { NOTIFICATION } from '../constant'

import { createSlice } from '@reduxjs/toolkit'
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

export const resetNotification = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(pushNotification({ message: '' }))
    }, 5000)
  }
}

export default notificationSlice.reducer
