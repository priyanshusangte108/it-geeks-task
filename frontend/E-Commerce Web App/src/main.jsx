import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartContext } from './context/CartContext'




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartContext>
    <App/>
  </CartContext>
    
  </StrictMode>,
)
