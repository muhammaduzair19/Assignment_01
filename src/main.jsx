import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '13px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  </StrictMode>,
)
