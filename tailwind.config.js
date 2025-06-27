/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}', // Path yang udah dioptimasi buat file source
  ],
  prefix: "",

  // ✅ OPTIMIZED SAFELIST - Cuma yang benar-benar diperlukan
  safelist: [
    // Brand-specific animations yang kompleks
    'animate-float-orb',
    'animate-theme-switch-light',
    'animate-theme-switch-dark',
    'animate-wipe-in-right',

    // Theme toggle components
    'theme-toggle-icon',
    'system-theme-indicator',

    // Interactive states
    'interactive-base',
    'interactive-colors',
    'interactive',
    'theme-transition-colors',

    // Performance classes
    'gpu-accelerated',

    // ✅ REDUCED PATTERN - Cuma delay yang sering dipake
    {
      pattern: /animation-delay-(100|200|300|500|1000)/,
    },

    // Status colors tetep diperlukan
    {
      pattern: /text-(primary|secondary|success|warning|error|info)/,
    }
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ============================================================================
         SISTEM DESIGN TOKEN - PAKE CSS VARIABLES BIAR BISA GANTI TEMA
         ============================================================================ */

      // 🎨 SISTEM WARNA SEMANTIC
      colors: {
        // ✅ Warna semantic (ambil dari CSS variables buat dukung light/dark theme)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // ✅ PRIMARY (Biru)
        primary: {
          DEFAULT: "#327498",
          50: "#f0f9ff",   // Teal-blue super terang
          100: "#e0f2fe",  // Teal-blue terang
          200: "#bae6fd",  // Teal-blue agak terang
          300: "#7dd3fc",  // Teal-blue terang
          400: "#38bdf8",  // Teal-blue sedang-terang
          500: "#327498",  // ✅ Warna brand asli (sesuai CSS variable)
          600: "#0284c7",  // Teal-blue sedang-gelap (hue konsisten)
          700: "#0369a1",  // Teal-blue gelap (hue konsisten)
          800: "#075985",  // Teal-blue lebih gelap (hue konsisten)
          900: "#0c4a6e",  // Teal-blue sangat gelap (hue konsisten)
          950: "#082f49",  // Teal-blue paling gelap (hue konsisten)
          foreground: "#ffffff",
        },

        // ✅ SECONDARY (Orange)
        secondary: {
          DEFAULT: "#F0A243",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#F0A243",  // ✅ Warna brand (sesuai CSS variable)
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
          foreground: "#ffffff",
        },

        // ✅ WARNA STATUS
        success: {
          DEFAULT: "#10b981",
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        warning: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        error: {
          DEFAULT: "#ef4444",
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        info: {
          DEFAULT: "#3b82f6",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },

      // 📝 SISTEM TYPOGRAPHY
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],  // Buat heading
        body: ["Inter", "system-ui", "sans-serif"],       // Buat body text
      },

      fontSize: {
        // ✅ Skala display (tetep dipertahanin - udah bagus banget)
        "display-2xl": ["4.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],

        // ✅ Skala body yang udah ditingkatin dengan sizing responsif
        "body-2xl": ["1.5rem", { lineHeight: "1.5" }],     // 24px
        "body-xl": ["1.25rem", { lineHeight: "1.6" }],      // 20px
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],     // 18px
        "body-md": ["1rem", { lineHeight: "1.6" }],         // 16px - base
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],     // 14px
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],      // 12px
        "body-2xs": ["0.625rem", { lineHeight: "1.4" }],    // 10px

        // ✅ Token typography semantic
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        "overline": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em", textTransform: "uppercase" }],
        "button": ["0.875rem", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "500" }],
        "label": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],

        // ✅ Typography responsif (mobile-first)
        "heading-responsive": ["1.875rem", { lineHeight: "1.3" }], // nanti naik jadi display-md di layar gede
        "body-responsive": ["0.875rem", { lineHeight: "1.5" }],    // nanti naik jadi body-md di layar gede
      },

      // 📐 SPACING & SIZING - AMBIL DARI SEMANTIC TOKENS
      spacing: {
        // ✅ Spacing layout semantic (ambil dari CSS variables)
        'header': 'var(--layout-header-height)',
        'sidebar': 'var(--layout-sidebar-width)',
        'container-padding': 'var(--layout-container-padding)',

        // ✅ Tetep spacing custom yang bermakna dengan nama semantic
        '18': '4.5rem',    // 72px - antara base spacing steps
        '22': '5.5rem',    // 88px - kebutuhan komponen spesifik
        '88': '22rem',     // 352px - spacing layout gede
        '112': '28rem',    // 448px - spacing section
        '128': '32rem',    // 512px - spacing section gede
      },

      maxWidth: {
        'content': 'var(--layout-content-max-width)',
      },

      width: {
        'sidebar': 'var(--layout-sidebar-width)',
      },

      height: {
        'header': 'var(--layout-header-height)',
      },

      // 🎭 ANIMASI & TRANSISI - MENGGUNAKAN CSS VARIABLES
      animation: {
        // ✅ Brand-specific animations dengan CSS variables
        "float-orb": "float-orb calc(var(--animation-duration-normal) * 50) ease-in-out infinite", // 15s equivalent
        "theme-switch-light": "theme-switch-light var(--theme-transition-duration) ease-out",
        "theme-switch-dark": "theme-switch-dark var(--theme-transition-duration) ease-out",
        "wipe-in-right": "wipe-in-right var(--animation-duration-slow) ease-out forwards",

        // ✅ Radix UI animations dengan timing konsisten
        "accordion-down": "accordion-down var(--animation-duration-fast) ease-out",
        "accordion-up": "accordion-up var(--animation-duration-fast) ease-out",

        // ✅ Gradient flow dengan timing yang konsisten
        "gradient-flow": "gradient-flow calc(var(--animation-duration-normal) * 10) ease-in-out infinite",

        // ✅ Common animations dengan CSS variables
        "fade-in": "fade-in-up calc(var(--animation-duration-normal) * 2) ease-out forwards",
        "slide-in": "fade-in-left calc(var(--animation-duration-normal) * 2) ease-out forwards",
        "scale-in": "scale-in var(--animation-duration-slow) ease-out forwards",
        "bounce": "bounce-subtle calc(var(--animation-duration-normal) * 6.67) ease-in-out infinite",
        "pulse": "pulse-soft calc(var(--animation-duration-normal) * 6.67) ease-in-out infinite",
      },

      keyframes: {
        // ✅ Brand-specific keyframes
        "float-orb": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(80px, -120px) scale(1.1)" },
          "66%": { transform: "translate(-100px, 40px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },

        "theme-switch-light": {
          from: { filter: "brightness(0.8) contrast(1.2)" },
          to: { filter: "brightness(1) contrast(1)" },
        },

        "theme-switch-dark": {
          from: { filter: "brightness(1.2) contrast(0.8)" },
          to: { filter: "brightness(1) contrast(1)" },
        },

        "wipe-in-right": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },

        // ✅ Radix UI keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // ✅ Common keyframes
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },

        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },

        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },

        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },

        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },

        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },

      // 🎪 EFEK BACKGROUND
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        // ✅ Gradient brand pake CSS variables buat dukung tema
        "gradient-primary": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%)",
        "gradient-secondary": "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--secondary)) 100%)",
        "gradient-hero": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
      },

      // 🥨 BORDER RADIUS
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      // 🎭 BOX SHADOW - MENGGUNAKAN CSS VARIABLES
      boxShadow: {
        // ✅ Shadow semantic tokens dari CSS variables
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "large": "var(--shadow-large)",
        "colored": "var(--shadow-colored)",
        "colored-secondary": "var(--shadow-colored-secondary)",

        // ✅ Deprecated - gunakan yang di atas
        "elevation-1": "var(--shadow-soft)",
        "elevation-2": "var(--shadow-medium)",
        "elevation-3": "var(--shadow-large)",
      },

      // 📱 RESPONSIVE BREAKPOINTS
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',

        // ✅ Breakpoints khusus buat use case tertentu
        'mobile': { 'max': '640px' },
        'tablet': { 'min': '641px', 'max': '1024px' },
        'desktop': { 'min': '1025px' },
      },

      // ⚡ TRANSITION TIMING FUNCTIONS
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-in-out-expo': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

        // ✅ Semantic easing functions
        'smooth': 'var(--animation-easing-smooth)',
        'bouncy': 'var(--animation-easing-bounce)',
        'sharp': 'var(--animation-easing-sharp)',
      },

      // ⏱️ DURASI TRANSISI - MENGGUNAKAN CSS VARIABLES
      transitionDuration: {
        'instant': 'var(--animation-duration-instant)',
        'fast': 'var(--animation-duration-fast)',
        'normal': 'var(--animation-duration-normal)',
        'slow': 'var(--animation-duration-slow)',
        'very-slow': 'var(--animation-duration-very-slow)',
      },

      // 🎯 SKALA Z-INDEX
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },

      // ✅ ANIMATION DELAY - MENGGUNAKAN CSS VARIABLES
      animationDelay: {
        'instant': 'var(--animation-duration-instant)',
        'fast': 'var(--animation-duration-fast)',
        'normal': 'var(--animation-duration-normal)',
        'slow': 'var(--animation-duration-slow)',
        'very-slow': 'var(--animation-duration-very-slow)',
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),

    // ✅ Plugin custom buat utility design system yang optimized
    function({ addUtilities, addComponents, theme }) {

      // ===== UTILITY CLASSES =====
      const newUtilities = {
        // Layout utilities
        '.layout-header': {
          height: 'var(--layout-header-height)',
        },
        '.layout-sidebar': {
          width: 'var(--layout-sidebar-width)',
        },
        '.layout-content': {
          maxWidth: 'var(--layout-content-max-width)',
        },

        // ✅ Animation utilities dengan CSS variables
        '.animate-theme-switch': {
          transition: 'all var(--theme-transition-duration) var(--theme-transition-easing)',
        },

        // Shadow utilities dengan semantic naming
        '.shadow-semantic-soft': {
          boxShadow: 'var(--shadow-soft)',
        },
        '.shadow-semantic-medium': {
          boxShadow: 'var(--shadow-medium)',
        },
        '.shadow-semantic-large': {
          boxShadow: 'var(--shadow-large)',
        },

        // ✅ Performance utilities
        '.gpu-accelerated': {
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        },

        // ✅ Animation control utilities
        '.animation-paused': {
          animationPlayState: 'paused',
        },
        '.animation-running': {
          animationPlayState: 'running',
        },
      }

      // ===== COMPONENT CLASSES =====
      const newComponents = {
        // ✅ Base interaction classes
        '.interactive-base': {
          transition: `
            transform var(--animation-duration-fast) var(--animation-easing-smooth),
            opacity var(--animation-duration-fast) var(--animation-easing-smooth)
          `,
          willChange: 'transform, opacity',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },

        '.interactive-colors': {
          transition: `
            color var(--animation-duration-fast) var(--animation-easing-smooth),
            background-color var(--animation-duration-fast) var(--animation-easing-smooth),
            border-color var(--animation-duration-fast) var(--animation-easing-smooth)
          `,
        },

        '.interactive': {
          transition: `
            transform var(--animation-duration-fast) var(--animation-easing-smooth),
            opacity var(--animation-duration-fast) var(--animation-easing-smooth),
            color var(--animation-duration-fast) var(--animation-easing-smooth),
            background-color var(--animation-duration-fast) var(--animation-easing-smooth),
            border-color var(--animation-duration-fast) var(--animation-easing-smooth)
          `,
          willChange: 'transform, opacity',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },

        // ✅ Theme transition class
        '.theme-transition-colors': {
          transition: `
            color var(--theme-transition-duration) var(--theme-transition-easing),
            background-color var(--theme-transition-duration) var(--theme-transition-easing),
            border-color var(--theme-transition-duration) var(--theme-transition-easing),
            fill var(--theme-transition-duration) var(--theme-transition-easing),
            stroke var(--theme-transition-duration) var(--theme-transition-easing)
          `,
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ],
}