// src/shared/providers/client-providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';

// Types for better TypeScript support
interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

// Error Fallback Component
function ErrorFallback({
                         error,
                         resetErrorBoundary
                       }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4 max-w-md mx-auto p-6">
        <div className="text-6xl">😵</div>
        <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-muted p-4 rounded-lg overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">Loading application...</p>
      </div>
    </div>
  );
}

// Motion Configuration Component
function MotionConfiguration({ children }: { children: ReactNode }) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? 'always' : 'never'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </MotionConfig>
  );
}

// Toast Configuration
const toastConfig = {
  position: 'top-right' as const,
  toastOptions: {
    duration: 4000,
    className: '',
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '0.75rem',
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.875rem',
      fontWeight: '500',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--primary-foreground))',
      },
      style: {
        borderColor: 'hsl(142 76% 36%)',
      },
    },
    error: {
      duration: 5000,
      iconTheme: {
        primary: 'hsl(var(--destructive))',
        secondary: 'hsl(var(--destructive-foreground))',
      },
      style: {
        borderColor: 'hsl(var(--destructive))',
      },
    },
    loading: {
      duration: Infinity,
      iconTheme: {
        primary: 'hsl(var(--muted-foreground))',
        secondary: 'hsl(var(--muted))',
      },
    },
  },
};

// Performance Monitoring Component (with safe web-vitals import)
function PerformanceMonitor({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Safe dynamic import of web-vitals
      const loadWebVitals = async () => {
        try {
          const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');

          const handleMetric = (metric: WebVitalsMetric) => {
            // Log to console in development, send to analytics in production
            if (process.env.NODE_ENV === 'development') {
              console.log(`${metric.name}:`, metric);
            } else {
              // Send to your analytics service
              // Example: analytics.track('Web Vital', metric);
              console.log(`${metric.name}: ${metric.value}`);
            }
          };

          onCLS(handleMetric);
          onFID(handleMetric);
          onFCP(handleMetric);
          onLCP(handleMetric);
          onTTFB(handleMetric);
        } catch (error) {
          console.warn('Web Vitals could not be loaded:', error);
        }
      };

      loadWebVitals();
    }
  }, []);

  return <>{children}</>;
}

// Query Client Configuration
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        // Performance optimization
        networkMode: 'online',
      },
      mutations: {
        retry: 1,
        networkMode: 'online',
        onError: (error: any) => {
          // Global error handling for mutations
          console.error('Mutation error:', error);
        },
      },
    },
  });
}

// Main App Providers Component
interface AppProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service
        console.error('Application Error:', error, errorInfo);

        // Report to analytics/monitoring in production
        if (process.env.NODE_ENV === 'production') {
          // Example: analytics.track('Application Error', { error: error.message });
        }
      }}
      onReset={() => {
        // Clear any cached data that might be causing issues
        queryClient.clear();

        // Optionally reload the page in production
        if (process.env.NODE_ENV === 'production') {
          window.location.reload();
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="prestige-academy-theme"
        >
          <MotionConfiguration>
            <PerformanceMonitor>
              <Suspense fallback={<LoadingFallback />}>
                {children}
              </Suspense>
            </PerformanceMonitor>
          </MotionConfiguration>

          {/* Toast Notifications */}
          <Toaster {...toastConfig} />

          {/* React Query DevTools */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom-right"
              buttonPosition="bottom-right"
            />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Development Debug Provider
export function DevDebugProvider({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <div className="debug-screens">
      {children}
      <div className="fixed bottom-4 left-4 z-[9999] space-y-2 pointer-events-none">
        <div className="bg-black text-white px-2 py-1 text-xs font-mono rounded shadow-lg">
          🐛 Debug Mode
        </div>
      </div>
    </div>
  );
}

// Analytics Provider (for production)
interface AnalyticsProviderProps {
  children: ReactNode;
  trackingId?: string;
}

export function AnalyticsProvider({
                                    children,
                                    trackingId
                                  }: AnalyticsProviderProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && trackingId) {
      // Initialize analytics
      // Example implementations:

      // Google Analytics 4
      if (typeof window !== 'undefined') {
        window.gtag?.('config', trackingId, {
          page_title: document.title,
          page_location: window.location.href,
        });
      }

      console.log('Analytics initialized with tracking ID:', trackingId);
    }
  }, [trackingId]);

  return <>{children}</>;
}

// Service Worker Provider
export function ServiceWorkerProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available; please refresh
                  console.log('New content is available; please refresh.');
                }
              });
            }
          });
        } catch (error) {
          console.log('SW registration failed: ', error);
        }
      };

      window.addEventListener('load', registerSW);
    }
  }, []);

  return <>{children}</>;
}

// Combined Production Providers
export function ProductionProviders({ children }: { children: ReactNode }) {
  return (
    <ServiceWorkerProvider>
      <AnalyticsProvider trackingId={process.env.NEXT_PUBLIC_GA_ID}>
        {children}
      </AnalyticsProvider>
    </ServiceWorkerProvider>
  );
}

// All-in-one Enhanced App Providers
export function EnhancedAppProviders({ children }: { children: ReactNode }) {
  return (
    <ClientProviders>
      {process.env.NODE_ENV === 'development' ? (
        <DevDebugProvider>{children}</DevDebugProvider>
      ) : (
        <ProductionProviders>{children}</ProductionProviders>
      )}
    </ClientProviders>
  );
}

// Export individual providers for flexibility
export {
  ErrorFallback,
  LoadingFallback,
  MotionConfiguration,
  PerformanceMonitor,
  createQueryClient,
};