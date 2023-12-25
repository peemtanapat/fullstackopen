import ReactDOM from 'react-dom/client';
// import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';

// * without redux toolkit
// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer,
// const store = createStore(reducer);

// * with redux toolkit
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
