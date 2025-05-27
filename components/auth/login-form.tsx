// components/auth/login-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from '../../lib/auth-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/dashboard'
      })
      
      if (result.error) {
        toast.error(result.error.message || 'Login failed')
      } else {
        toast.success('Logged in successfully')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          disabled={isLoading}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
