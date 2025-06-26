import { LoginForm } from '@/features/auth/components/forms/login-form'

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
}