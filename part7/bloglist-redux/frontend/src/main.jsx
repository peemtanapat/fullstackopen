import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
