export const logAction = (actionName, state, action) => {
  console.log({ type: action.type, payload: action.payload });
  //   console.log(actionName, { state, payload: action.payload, action });
};
