import { RegisterForm } from '@/features/auth/components/forms/register-form'

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
}