import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from "./context/StoreContext";
import Router from './Router/Router.jsx'

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      retry: 3,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
    </StoreProvider>
  </QueryClientProvider>
)