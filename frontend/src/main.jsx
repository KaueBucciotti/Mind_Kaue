import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { AuthProvider } from "./context/authContext.jsx";
import { PsicologosProvider } from "./context/psicologos.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PsicologosProvider>
        <App />
      </PsicologosProvider>
    </AuthProvider>
  </StrictMode>,
)
