// src/shared/hooks/use-theme.ts
'use client';

import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export type ThemeOption = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  value: ThemeOption;
  label: string;
  description: string;
  icon: string;
}

export const themeConfigs: ThemeConfig[] = [
  {
    value: 'light',
    label: 'Light',
    description: 'Tema terang untuk kenyamanan siang hari',
    icon: '☀️'
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Tema gelap untuk kenyamanan mata',
    icon: '🌙'
  },
  {
    value: 'system',
    label: 'System',
    description: 'Mengikuti pengaturan sistem',
    icon: '💻'
  }
];

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe getter untuk current theme
  const currentTheme = mounted ? (theme as ThemeOption) : 'system';
  const currentResolvedTheme = mounted ? resolvedTheme : 'light';

  const getCurrentThemeConfig = () => {
    return themeConfigs.find(config => config.value === currentTheme) || themeConfigs[2];
  };

  const toggleTheme = () => {
    const currentIndex = themeConfigs.findIndex(config => config.value === currentTheme);
    const nextIndex = (currentIndex + 1) % themeConfigs.length;
    const nextTheme = themeConfigs[nextIndex].value;

    setIsTransitioning(true);
    setTheme(nextTheme);

    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const setThemeWithTransition = (newTheme: ThemeOption) => {
    setIsTransitioning(true);
    setTheme(newTheme);

    // Add theme-specific animation class
    if (mounted) {
      const html = document.documentElement;
      const animationClass = newTheme === 'dark' ? 'animate-theme-switch-dark' : 'animate-theme-switch-light';
      html.classList.add(animationClass);

      setTimeout(() => {
        html.classList.remove(animationClass);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Quick theme checks
  const isDarkMode = currentResolvedTheme === 'dark';
  const isLightMode = currentResolvedTheme === 'light';
  const isSystemMode = currentTheme === 'system';

  // Get effective theme (resolved theme for system)
  const effectiveTheme = isSystemMode ? currentResolvedTheme : currentTheme;

  // Theme utilities
  const getThemeIcon = (themeValue: ThemeOption = currentTheme) => {
    const config = themeConfigs.find(c => c.value === themeValue);
    return config?.icon || '🎨';
  };

  const getThemeLabel = (themeValue: ThemeOption = currentTheme) => {
    const config = themeConfigs.find(c => c.value === themeValue);
    return config?.label || 'Unknown';
  };

  const getContrastMode = () => {
    if (!mounted) return 'normal';

    try {
      const isHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      return isHighContrast ? 'high' : 'normal';
    } catch {
      return 'normal';
    }
  };

  const getMotionPreference = () => {
    if (!mounted) return 'no-preference';

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return prefersReducedMotion ? 'reduce' : 'no-preference';
    } catch {
      return 'no-preference';
    }
  };

  return {
    // Core theme values
    theme: currentTheme,
    resolvedTheme: currentResolvedTheme,
    effectiveTheme,
    systemTheme,

    // Actions
    setTheme: setThemeWithTransition,
    toggleTheme,

    // Utilities
    getCurrentThemeConfig,
    getThemeIcon,
    getThemeLabel,

    // State checks
    isDarkMode,
    isLightMode,
    isSystemMode,
    isTransitioning,
    mounted,

    // Accessibility
    getContrastMode,
    getMotionPreference,

    // Configuration
    themeConfigs,

    // Events (for advanced usage)
    setThemeImmediate: setTheme // Original setter without transition
  };
}

// Hook khusus untuk system theme detection
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    // Get initial system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for system theme changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');

      // Dispatch custom event for other components
      const event = new CustomEvent('system-theme-change', {
        detail: {
          isDark: e.matches,
          theme: e.matches ? 'dark' : 'light'
        }
      });
      window.dispatchEvent(event);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return {
    systemTheme,
    isDarkSystem: systemTheme === 'dark',
    isLightSystem: systemTheme === 'light',
    mounted
  };
}

// Hook untuk theme persistence dan analytics
export function useThemeAnalytics() {
  const { theme, resolvedTheme } = useTheme();
  const [themeHistory, setThemeHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!theme) return;

    // Track theme usage
    setThemeHistory(prev => {
      const newHistory = [...prev, theme].slice(-10); // Keep last 10 changes

      // Store in localStorage for persistence
      try {
        localStorage.setItem('theme-history', JSON.stringify(newHistory));
      } catch (error) {
        console.warn('Failed to store theme history:', error);
      }

      return newHistory;
    });

    // Analytics event (replace with your analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'theme_change', {
        event_category: 'UI',
        event_label: theme,
        value: resolvedTheme
      });
    }
  }, [theme, resolvedTheme]);

  const getMostUsedTheme = () => {
    const counts = themeHistory.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'system';
  };

  const getThemeUsageStats = () => {
    const total = themeHistory.length;
    const stats = themeHistory.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([theme, count]) => ({
      theme,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  };

  return {
    themeHistory,
    getMostUsedTheme,
    getThemeUsageStats
  };
}

// Hook untuk theme preloading dan optimization
export function useThemeOptimization() {
  const { theme, mounted } = useTheme();

  const preloadThemeAssets = (targetTheme: ThemeOption) => {
    if (!mounted || typeof window === 'undefined') return;

    // Preload theme-specific images
    const imagesToPreload = [
      `/images/themes/${targetTheme}-logo.svg`,
      `/images/themes/${targetTheme}-hero.jpg`,
      `/images/themes/${targetTheme}-background.svg`
    ];

    imagesToPreload.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload theme-specific CSS if using CSS files
    const cssLink = document.createElement('link');
    cssLink.rel = 'prefetch';
    cssLink.as = 'style';
    cssLink.href = `/themes/${targetTheme}.css`;
    document.head.appendChild(cssLink);
  };

  const optimizeThemeTransition = () => {
    if (!mounted) return;

    // Use CSS containment for better performance
    document.documentElement.style.contain = 'layout style paint';

    // Enable GPU acceleration for transitions
    document.documentElement.style.willChange = 'background-color, color';

    // Cleanup after transition
    setTimeout(() => {
      document.documentElement.style.contain = '';
      document.documentElement.style.willChange = '';
    }, 500);
  };

  const prefetchAllThemes = () => {
    themeConfigs.forEach(config => {
      if (config.value !== theme) {
        preloadThemeAssets(config.value);
      }
    });
  };

  return {
    preloadThemeAssets,
    optimizeThemeTransition,
    prefetchAllThemes
  };
}

// Hook untuk theme keyboard shortcuts
export function useThemeKeyboard() {
  const { toggleTheme, setTheme, mounted } = useTheme();

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + D untuk toggle theme
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        toggleTheme();
      }

      // Ctrl/Cmd + Shift + L untuk light mode
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        setTheme('light');
      }

      // Ctrl/Cmd + Shift + D untuk dark mode
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setTheme('dark');
      }

      // Ctrl/Cmd + Shift + S untuk system mode
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'S') {
        event.preventDefault();
        setTheme('system');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, toggleTheme, setTheme]);

  return {
    shortcuts: {
      toggle: 'Ctrl/Cmd + D',
      light: 'Ctrl/Cmd + Shift + L',
      dark: 'Ctrl/Cmd + Shift + D',
      system: 'Ctrl/Cmd + Shift + S'
    }
  };
}

// Hook untuk theme dengan local storage custom
export function useThemeStorage(key: string = 'prestige-theme-preferences') {
  const { theme, setTheme, mounted } = useTheme();
  const [preferences, setPreferences] = useState({
    autoSwitch: false,
    darkModeStart: '18:00',
    lightModeStart: '06:00',
    respectSystemChanges: true
  });

  useEffect(() => {
    if (!mounted) return;

    // Load preferences dari localStorage
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    }
  }, [key, mounted]);

  const updatePreferences = (newPrefs: Partial<typeof preferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);

    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save theme preferences:', error);
    }
  };

  // Auto-switch berdasarkan waktu
  useEffect(() => {
    if (!mounted || !preferences.autoSwitch) return;

    const checkTimeBasedTheme = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const isDarkTime = currentTime >= preferences.darkModeStart || currentTime < preferences.lightModeStart;
      const targetTheme = isDarkTime ? 'dark' : 'light';

      if (theme !== targetTheme && theme !== 'system') {
        setTheme(targetTheme);
      }
    };

    checkTimeBasedTheme();
    const interval = setInterval(checkTimeBasedTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [mounted, preferences, theme, setTheme]);

  return {
    preferences,
    updatePreferences
  };
}

// Main export dengan all hooks combined untuk convenience
export function useEnhancedTheme() {
  const themeHook = useTheme();
  const systemHook = useSystemTheme();
  const analyticsHook = useThemeAnalytics();
  const optimizationHook = useThemeOptimization();
  const keyboardHook = useThemeKeyboard();
  const storageHook = useThemeStorage();

  return {
    ...themeHook,
    ...systemHook,
    ...analyticsHook,
    ...optimizationHook,
    ...keyboardHook,
    ...storageHook
  };
}