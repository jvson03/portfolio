"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  // Add a class to the body when theme is changing
  const handleThemeChange = () => {
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  React.useEffect(() => {
    const body = document.body
    if (isTransitioning) {
      body.classList.add("theme-transitioning")
    } else {
      body.classList.remove("theme-transitioning")
    }
  }, [isTransitioning])

  return (
    <NextThemesProvider onThemeChange={handleThemeChange} {...props}>
      {children}
    </NextThemesProvider>
  )
}

