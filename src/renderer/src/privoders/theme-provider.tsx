import React, { useEffect, useState } from 'react'
import type { Theme } from '@/privoders/theme-context'
import { ThemeProviderContext } from '@/privoders/theme-context'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(() => {
    // Safely get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent): void => {
        root.classList.remove('light', 'dark')
        root.classList.add(e.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
