// app/(auth)/register/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join Scrim Platform to organize matches and track your gaming performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthForm 
            type="SIGN_UP"
            schema={registerSchema}
            defaultValues={{}}
            onSubmit={}
          />
          
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}