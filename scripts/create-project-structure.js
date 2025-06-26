// scripts/create-project-structure.js
const fs = require('fs');
const path = require('path');

// Define all directories to create
const directories = [
    // App Router Structure
    'src/app/(auth)/login',
    'src/app/(auth)/register',
    'src/app/(auth)/verify',
    'src/app/(auth)/forgot-password',
    'src/app/(auth)/reset-password',

    'src/app/(dashboard)/dashboard',
    'src/app/(dashboard)/profile/edit',
    'src/app/(dashboard)/profile/settings',
    'src/app/(dashboard)/packages/[id]',
    'src/app/(dashboard)/tryout-events/[id]',
    'src/app/(dashboard)/my-tests/[id]',
    'src/app/(dashboard)/transactions/[id]',
    'src/app/(dashboard)/transactions/checkout/[id]',
    'src/app/(dashboard)/leaderboard/[packageId]',

    'src/app/(admin)/admin/dashboard',
    'src/app/(admin)/admin/users/[id]',
    'src/app/(admin)/admin/packages/create',
    'src/app/(admin)/admin/packages/[id]/edit',
    'src/app/(admin)/admin/questions/create',
    'src/app/(admin)/admin/questions/[id]/edit',
    'src/app/(admin)/admin/tryout-events/create',
    'src/app/(admin)/admin/tryout-events/[id]/edit',
    'src/app/(admin)/admin/transactions',
    'src/app/(admin)/admin/master-data/institutions',
    'src/app/(admin)/admin/master-data/positions',
    'src/app/(admin)/admin/master-data/education-levels',
    'src/app/(admin)/admin/master-data/majors',

    'src/app/(exam)/tryout/[sessionId]/start',
    'src/app/(exam)/tryout/[sessionId]/test',
    'src/app/(exam)/tryout/[sessionId]/review',
    'src/app/(exam)/tryout/[sessionId]/result',

    'src/app/(marketing)/about',
    'src/app/(marketing)/packages',
    'src/app/(marketing)/contact',
    'src/app/(marketing)/faq',

    'src/app/api/webhooks/midtrans',
    'src/app/api/upload/avatar',
    'src/app/api/upload/question-image',
    'src/app/api/health',

    // Features Structure
    'src/features/auth/components/forms',
    'src/features/auth/components/guards',
    'src/features/auth/components/providers',
    'src/features/auth/hooks',
    'src/features/auth/services',
    'src/features/auth/stores',
    'src/features/auth/utils',
    'src/features/auth/types',
    'src/features/auth/constants',

    'src/features/profile/components',
    'src/features/profile/hooks',
    'src/features/profile/services',
    'src/features/profile/types',

    'src/features/packages/components',
    'src/features/packages/hooks',
    'src/features/packages/services',
    'src/features/packages/types',

    'src/features/tryout/components/session',
    'src/features/tryout/components/controls',
    'src/features/tryout/components/results',
    'src/features/tryout/hooks',
    'src/features/tryout/services',
    'src/features/tryout/stores',
    'src/features/tryout/utils',
    'src/features/tryout/types',

    'src/features/tryout-events/components',
    'src/features/tryout-events/hooks',
    'src/features/tryout-events/services',
    'src/features/tryout-events/types',

    'src/features/transactions/components',
    'src/features/transactions/hooks',
    'src/features/transactions/services',
    'src/features/transactions/types',

    'src/features/leaderboard/components',
    'src/features/leaderboard/hooks',
    'src/features/leaderboard/services',
    'src/features/leaderboard/types',

    'src/features/dashboard/components/stats',
    'src/features/dashboard/components/recent',
    'src/features/dashboard/components/widgets',
    'src/features/dashboard/hooks',
    'src/features/dashboard/services',
    'src/features/dashboard/types',

    'src/features/admin/components/data-tables',
    'src/features/admin/components/forms',
    'src/features/admin/components/charts',
    'src/features/admin/hooks',
    'src/features/admin/services',
    'src/features/admin/types',

    'src/features/master-data/components/forms',
    'src/features/master-data/components/selects',
    'src/features/master-data/hooks',
    'src/features/master-data/services',
    'src/features/master-data/types',

    // Shared Structure
    'src/shared/components/ui/button',
    'src/shared/components/ui/input',
    'src/shared/components/ui/modal',
    'src/shared/components/ui/toast',
    'src/shared/components/ui/skeleton',
    'src/shared/components/layout/header',
    'src/shared/components/layout/sidebar',
    'src/shared/components/layout/footer',
    'src/shared/components/layout/breadcrumb',
    'src/shared/components/forms',
    'src/shared/components/feedback',

    'src/shared/hooks',
    'src/shared/lib/api',
    'src/shared/lib/websocket',
    'src/shared/lib/storage',
    'src/shared/lib/validation/schemas',
    'src/shared/lib/utils',
    'src/shared/constants',
    'src/shared/types',
    'src/shared/providers',
    'src/shared/styles',

    // Public Assets
    'public/images/logo',
    'public/images/illustrations',
    'public/images/placeholders',
    'public/icons',
    'public/sounds',
    'public/fonts/poppins',

    // Testing
    'tests/unit/utils',
    'tests/unit/components',
    'tests/integration/services',
    'tests/integration/api',
    'tests/e2e/auth',
    'tests/e2e/tryout',
    'tests/fixtures/mock-data',

    // Documentation & Config
    'docs',
    'scripts',
    '.github/workflows',
    '.vscode',
];

// Define initial files to create with content
const files = [
    // Layout files
    {
        path: 'src/app/(auth)/layout.tsx',
        content: `export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}`
    },

    {
        path: 'src/app/(dashboard)/layout.tsx',
        content: `import { DashboardHeader } from '@/shared/components/layout/header/dashboard-header'
import { DashboardSidebar } from '@/shared/components/layout/sidebar/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}`
    },

    {
        path: 'src/app/(admin)/layout.tsx',
        content: `import { AdminHeader } from '@/shared/components/layout/header/admin-header'
import { AdminSidebar } from '@/shared/components/layout/sidebar/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}`
    },

    {
        path: 'src/app/(exam)/layout.tsx',
        content: `export default function TryoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}`
    },

    {
        path: 'src/app/(marketing)/layout.tsx',
        content: `import { MarketingHeader } from '@/shared/components/layout/header/marketing-header'
import { Footer } from '@/shared/components/layout/footer/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}`
    },

    // Page files
    {
        path: 'src/app/(auth)/login/page.tsx',
        content: `import { LoginForm } from '@/features/auth/components/forms/login-form'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Login to your account</p>
      </div>
      <LoginForm />
    </div>
  )
}`
    },

    {
        path: 'src/app/(auth)/register/page.tsx',
        content: `import { RegisterForm } from '@/features/auth/components/forms/register-form'

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-600 mt-2">Join Prestige Academy today</p>
      </div>
      <RegisterForm />
    </div>
  )
}`
    },

    {
        path: 'src/app/(dashboard)/dashboard/page.tsx',
        content: `export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard content */}
      </div>
    </div>
  )
}`
    },

    // Loading files
    {
        path: 'src/app/loading.tsx',
        content: `export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )
}`
    },

    // Error files
    {
        path: 'src/app/error.tsx',
        content: `'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  )
}`
    },

    // Not found file
    {
        path: 'src/app/not-found.tsx',
        content: `import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-600 mb-8">Page not found</p>
      <Link href="/" className="btn-primary">
        Go back home
      </Link>
    </div>
  )
}`
    },

    // Theme Provider
    {
        path: 'src/shared/providers/theme-provider.tsx',
        content: `'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}`
    }
];

// Function to create directory
function createDir(dirPath) {
    const fullPath = path.join(process.cwd(), dirPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Created: ${dirPath}`);
    } else {
        console.log(`⏭️  Exists: ${dirPath}`);
    }
}

// Function to create file
function createFile(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Created: ${filePath}`);
    } else {
        console.log(`⏭️  Exists: ${filePath}`);
    }
}

// Main execution
console.log('🚀 Creating project structure...\n');

// Create all directories
directories.forEach(createDir);

console.log('\n📄 Creating initial files...\n');

// Create all files
files.forEach(file => createFile(file.path, file.content));

console.log('\n✨ Project structure created successfully!');
console.log('\n📌 Next steps:');
console.log('1. Run "pnpm install" to install dependencies');
console.log('2. Copy .env.example to .env.local and configure');
console.log('3. Run "pnpm dev" to start development server');