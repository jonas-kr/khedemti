import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CompanyProvider from './context/CompanyContext.jsx'
import WorkerProvider from './context/WorkerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkerProvider>
    <CompanyProvider>
      <App />
    </CompanyProvider>
    </WorkerProvider>
  </React.StrictMode>
)
