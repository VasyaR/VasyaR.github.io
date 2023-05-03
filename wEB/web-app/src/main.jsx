import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './register.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './providers/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider>
          <App />
        </Provider>
    </BrowserRouter>
)
