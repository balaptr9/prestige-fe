// src/shared/components/ui/theme-toggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle } from '@/shared/components/ui/modal';
import { Badge } from '@/shared/components/ui/badge';
import { useTheme, type ThemeOption } from '@/shared/hooks/use-theme';
import { cn } from '@/shared/lib/utils/cn';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'compact';
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const ThemeIcon = ({ theme, className }: { theme: string; className?: string }) => {
  const iconProps = { className: cn('h-4 w-4 transition-all duration-300', className) };

  switch (theme) {
    case 'light':
      return <Sun {...iconProps} className={cn(iconProps.className, 'theme-toggle-icon sun')} />;
    case 'dark':
      return <Moon {...iconProps} className={cn(iconProps.className, 'theme-toggle-icon moon')} />;
    case 'system':
      return <Monitor {...iconProps} />;
    default:
      return <Palette {...iconProps} />;
  }
};

// Loading skeleton component
const ThemeToggleSkeleton = ({ variant, showLabel, size, className }: ThemeToggleProps) => (
  <Button
    variant="ghost"
    size={showLabel ? size || "default" : "icon"}
    className={cn(
      "pointer-events-none",
      showLabel ? "gap-2" : variant === 'compact' ? "h-9 w-9 rounded-lg" : "h-9 w-9 rounded-lg",
      className
    )}
    disabled
  >
    <div className="h-4 w-4 animate-pulse bg-muted rounded" />
    {showLabel && (
      <div className="h-4 w-16 animate-pulse bg-muted rounded" />
    )}
    <span className="sr-only">Loading theme...</span>
  </Button>
);

export function ThemeToggle({
                              variant = 'button',
                              showLabel = false,
                              size = 'default',
                              className
                            }: ThemeToggleProps) {
  const {
    theme,
    setTheme,
    toggleTheme,
    getCurrentThemeConfig,
    themeConfigs,
    mounted,
    isDarkMode,
    isLightMode,
    isSystemMode,
    resolvedTheme,
    isTransitioning,
    getThemeIcon,
    getThemeLabel,
    optimizeThemeTransition
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [recentThemes, setRecentThemes] = useState<ThemeOption[]>([]);

  // Track recent theme changes
  useEffect(() => {
    if (mounted && theme) {
      setRecentThemes(prev => {
        const updated = [theme, ...prev.filter(t => t !== theme)].slice(0, 3);
        return updated as ThemeOption[];
      });
    }
  }, [theme, mounted]);

  // Show skeleton while not mounted to prevent hydration mismatch
  if (!mounted) {
    return <ThemeToggleSkeleton variant={variant} showLabel={showLabel} size={size} className={className} />;
  }

  const currentConfig = getCurrentThemeConfig();

  // Compact variant - simple toggle between light/dark with smooth animation
  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          optimizeThemeTransition();
          setTheme(isDarkMode ? 'light' : 'dark');
        }}
        className={cn(
          "relative h-9 w-9 rounded-lg transition-all hover:bg-accent",
          isTransitioning && "pointer-events-none",
          className
        )}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        disabled={isTransitioning}
      >
        <Sun className="h-4 w-4 absolute theme-toggle-icon sun" />
        <Moon className="h-4 w-4 absolute theme-toggle-icon moon" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Button variant - cycling through themes with label option
  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size={showLabel ? size : "icon"}
        onClick={() => {
          optimizeThemeTransition();
          toggleTheme();
        }}
        className={cn(
          "transition-all hover:bg-accent",
          showLabel ? "gap-2" : "h-9 w-9 rounded-lg",
          isTransitioning && "pointer-events-none opacity-75",
          isSystemMode && "system-theme-indicator relative",
          className
        )}
        aria-label={`Current theme: ${currentConfig.label}. Click to cycle themes.`}
        disabled={isTransitioning}
      >
        <ThemeIcon theme={theme} />
        {showLabel && (
          <span className="text-sm font-medium">{currentConfig.label}</span>
        )}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </Button>
    );
  }

  // Dropdown variant - full modal with all options and advanced features
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-9 w-9 rounded-lg hover:bg-accent transition-colors",
            isSystemMode && "system-theme-indicator",
            className
          )}
          aria-label="Open theme selector"
        >
          <ThemeIcon theme={theme} />
          <span className="sr-only">Select theme</span>
        </Button>
      </ModalTrigger>

      <ModalContent size="sm" className="max-w-xs">
        <ModalHeader>
          <ModalTitle className="text-center flex items-center justify-center gap-2">
            <Palette className="h-4 w-4" />
            Pilih Tema
          </ModalTitle>
        </ModalHeader>

        <div className="p-4 space-y-4">
          {/* Current status */}
          <div className="text-center py-2 px-3 bg-muted rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Mode saat ini</div>
            <div className="flex items-center justify-center gap-2">
              <ThemeIcon theme={resolvedTheme} />
              <span className="font-medium text-sm capitalize">{resolvedTheme}</span>
              {isSystemMode && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  Auto
                </Badge>
              )}
            </div>
          </div>

          {/* Theme options */}
          <div className="grid gap-2">
            {themeConfigs.map((themeOption) => {
              const isActive = theme === themeOption.value;
              const isCurrentResolved = resolvedTheme === themeOption.value ||
                (themeOption.value === 'system' && theme === 'system');

              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    optimizeThemeTransition();
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-3 w-full px-3 py-3 text-left rounded-lg transition-all',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  aria-pressed={isActive}
                  disabled={isTransitioning}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0",
                    isActive
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                  )}>
                    <ThemeIcon theme={themeOption.value} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{themeOption.label}</span>
                      {isCurrentResolved && !isActive && (
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0.5"
                        >
                          active
                        </Badge>
                      )}
                      {recentThemes.includes(themeOption.value) && recentThemes[0] !== themeOption.value && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0.5"
                        >
                          recent
                        </Badge>
                      )}
                    </div>
                    <div className={cn(
                      'text-xs leading-tight mt-0.5',
                      isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {themeOption.description}
                    </div>
                  </div>

                  {isActive && (
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="pt-2 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  optimizeThemeTransition();
                  toggleTheme();
                }}
                className="flex-1 text-xs"
                disabled={isTransitioning}
              >
                🔄 Cycle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  optimizeThemeTransition();
                  setTheme('system');
                  setIsOpen(false);
                }}
                className="flex-1 text-xs"
                disabled={isTransitioning || theme === 'system'}
              >
                🖥️ Auto
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

// Export individual components for flexibility
export { ThemeIcon };