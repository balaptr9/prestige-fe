// src/shared/lib/fonts.ts
import { Poppins, Inter } from 'next/font/google'

/**
 * ✅ FONT OPTIMIZATION - Mengganti Google Fonts CDN dengan Next.js font optimization
 *
 * Keuntungan:
 * - Zero layout shift dengan display: 'swap'
 * - Automatic font preloading
 * - Better Core Web Vitals (LCP, CLS)
 * - Menghilangkan render-blocking external requests
 */

// 🎨 Poppins - Untuk heading dan display text
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

// 📝 Inter - Untuk body text dan UI components
export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

// 🔗 Combined font variables untuk CSS
export const fontVariables = `${poppins.variable} ${inter.variable}`

// 📊 Font classes untuk digunakan langsung di components
export const fontClasses = {
  poppins: poppins.className,
  inter: inter.className,
  display: poppins.className,  // Alias untuk heading
  body: inter.className,       // Alias untuk body text
} as const