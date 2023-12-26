import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION } from '../constant/constant';
import { logAction } from '../utils/logger';

const notificationSlice = createSlice({
  name: NOTIFICATION,
  initialState: '',
  reducers: {
    pushNotification(state, action) {
      logAction('pushNotification', state, action);
      return action.payload;
    },
  },
});

export const { pushNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
