import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { UserInfoContextProvider } from './contexts/UserInfoContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <UserInfoContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserInfoContextProvider>
  </NotificationContextProvider>,
)
