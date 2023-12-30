export const logAction = (state, action) => {
  console.log({ type: action.type, payload: action.payload })
}
