import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION } from '../constant/constant';

const notificationSlice = createSlice({
  name: NOTIFICATION,
  initialState: '',
  reducers: {
    pushNotification(state, action) {
      console.log('pushNotification', { state, action });
      return action.payload;
    },
  },
});

export const { pushNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
