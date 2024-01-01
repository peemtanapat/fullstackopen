import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import usersStatReducer from './reducers/usersStatReducer'
import userInfoReducer from './reducers/userInfoReducer'
import singleBlogReducer from './reducers/singleBlogReducer'

const store = configureStore({
  reducer: {
    singleBlog: singleBlogReducer,
    blogList: blogListReducer,
    notification: notificationReducer,
    user: userReducer,
    usersStat: usersStatReducer,
    userInfo: userInfoReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
