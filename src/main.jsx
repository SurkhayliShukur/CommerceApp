import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Context } from "../src/Context/Context.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Context>
)
