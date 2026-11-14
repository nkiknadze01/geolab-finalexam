import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

export const loginSchema = yup.object({
  email: yup.string().trim().email('არასწორი ელ-ფოსტის ფორმატი').required('ელ-ფოსტა სავალდებულოა'),
  password: yup.string().min(6, 'პაროლი მინიმუმ 6 სიმბოლოა').required('პაროლი სავალდებულოა'),
})

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) })

  if (isAuthenticated) return <Navigate to="/" replace />

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await login(values)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <AuthLayout
      title="შესვლა"
      subtitle="შედით თქვენს ანგარიშში ფინანსების სამართავად"
      footer={
        <>
          არ გაქვთ ანგარიში?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            რეგისტრაცია
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="ელ-ფოსტა" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <FormField label="პაროლი" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
        {serverError && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'მიმდინარეობს...' : 'შესვლა'}
        </button>
      </form>
    </AuthLayout>
  )
}
