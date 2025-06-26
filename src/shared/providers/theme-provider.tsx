'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface ThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode
  enableTransitions?: boolean
  enableSystemDetection?: boolean
  storageKey?: string
}

export function ThemeProvider({
                                children,
                                enableTransitions = true,
                                enableSystemDetection = true,
                                storageKey = 'prestige-academy-theme',
                                ...props
                              }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!enableTransitions) return

    // Add smooth transition class to document
    document.documentElement.classList.add('theme-transitions')

    // Handle theme switching animations
    const handleThemeChange = () => {
      setIsTransitioning(true)
      document.documentElement.classList.add('theme-switching')

      // Remove transition blocking after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        document.documentElement.classList.remove('theme-switching')
      }, 300)

      return () => clearTimeout(timer)
    }

    // Listen for theme changes in class attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          const cleanup = handleThemeChange()
          // Store cleanup function for potential early cleanup
          if (cleanup) cleanup()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Cleanup on unmount
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('theme-transitions', 'theme-switching')
    }
  }, [enableTransitions])

  // Add system theme detection
  useEffect(() => {
    if (!enableSystemDetection || !mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Dispatch custom event for system theme change
      const event = new CustomEvent('system-theme-change', {
        detail: { isDark: e.matches }
      })
      window.dispatchEvent(event)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [enableSystemDetection, mounted])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={enableSystemDetection}
      disableTransitionOnChange={false}
      storageKey={storageKey}
      themes={['light', 'dark', 'system']}
      {...props}
    >
      {children}
      {/* Loading state untuk mencegah flash */}
      {!mounted && (
        <style jsx global>{`
          body {
            visibility: hidden;
          }
        `}</style>
      )}
    </NextThemesProvider>
  )
}

// Hook tambahan untuk theme utilities
export function useThemeUtils() {
  const [mounted, setMounted] = useState(false)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)

    // Get initial system theme
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setSystemTheme(isDark ? 'dark' : 'light')
    }

    // Listen for system theme changes
    const handleSystemChange = (e: CustomEvent) => {
      setSystemTheme(e.detail.isDark ? 'dark' : 'light')
    }

    window.addEventListener('system-theme-change', handleSystemChange as EventListener)

    return () => {
      window.removeEventListener('system-theme-change', handleSystemChange as EventListener)
    }
  }, [])

  const preloadThemeAssets = (theme: 'light' | 'dark') => {
    // Preload theme-specific assets if needed
    if (typeof window === 'undefined') return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'style'
    link.href = `/themes/${theme}-theme.css`
    document.head.appendChild(link)
  }

  const getContrastRatio = () => {
    // Simple contrast ratio detection for accessibility
    if (typeof window === 'undefined') return 'normal'

    const style = getComputedStyle(document.documentElement)
    const bg = style.getPropertyValue('--background')
    const fg = style.getPropertyValue('--foreground')

    // Simple heuristic - in real app, use proper color contrast calculation
    return bg.includes('0%') ? 'high' : 'normal'
  }

  return {
    mounted,
    systemTheme,
    preloadThemeAssets,
    getContrastRatio,
    isSystemDark: systemTheme === 'dark'
  }
}