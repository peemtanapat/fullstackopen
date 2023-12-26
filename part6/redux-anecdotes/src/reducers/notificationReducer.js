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
    clearNotification(state, action) {
      return '';
    },
  },
});

export const { pushNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, seconds = 5) => {
  return async (dispatch) => {
    dispatch(pushNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};
export default notificationSlice.reducer;
