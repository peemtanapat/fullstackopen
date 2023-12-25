const filterReducer = (state = '', action) => {
  console.log('%c⧭', 'color: #00a3cc', { state, payload: action.payload });
  if (action.type === 'FILTER') {
    return action.payload;
  }
  return state;
};

export const filterChange = (filter) => {
  return {
    type: 'FILTER',
    payload: filter,
  };
};

export default filterReducer;
