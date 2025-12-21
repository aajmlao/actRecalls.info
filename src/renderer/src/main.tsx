import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Apply theme immediately before React renders (Electron-specific)
function applyTheme(): void {
  const storageKey = 'vite-ui-theme'
  const theme = localStorage.getItem(storageKey) || 'system'
  const root = document.documentElement

  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

// Apply theme synchronously before React renders
applyTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
