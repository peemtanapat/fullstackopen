import { createSlice } from '@reduxjs/toolkit';
import { FILTER } from '../constant/constant';

const filterSlice = createSlice({
  name: FILTER,
  initialState: '',
  reducers: {
    doFilter(state, action) {
      return action.payload;
    },
  },
});

export const filterChange = (filter) => {
  return {
    type: 'FILTER',
    payload: filter,
  };
};

export const { doFilter } = filterSlice.actions;

export default filterSlice.reducer;
