import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/JS/bootstrap.bundle.js';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './components/context/StoreContext.jsx';
import { DarkModeProvider } from './components/Themecontext/DarkTheme.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
        <DarkModeProvider>
          <App />

        </DarkModeProvider>
      </BrowserRouter>
    </StoreContextProvider>
  </StrictMode>,
)
