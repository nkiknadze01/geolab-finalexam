import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

const schema = yup.object({
  name: yup.string().trim().min(2, 'სახელი მინიმუმ 2 სიმბოლოა').required('სახელი სავალდებულოა'),
  email: yup.string().trim().email('არასწორი ელ-ფოსტის ფორმატი').required('ელ-ფოსტა სავალდებულოა'),
  password: yup
    .string()
    .min(6, 'პაროლი მინიმუმ 6 სიმბოლოა')
    .matches(/\d/, 'პაროლი უნდა შეიცავდეს ციფრს')
    .required('პაროლი სავალდებულოა'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'პაროლები არ ემთხვევა')
    .required('გაიმეორეთ პაროლი'),
})

export default function Register() {
  const { register: signUp, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  if (isAuthenticated) return <Navigate to="/" replace />

  const onSubmit = async ({ name, email, password }) => {
    setServerError('')
    try {
      await signUp({ name, email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <AuthLayout
      title="რეგისტრაცია"
      subtitle="შექმენით ანგარიში და დაიწყეთ ხარჯების კონტროლი"
      footer={
        <>
          უკვე გაქვთ ანგარიში?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            შესვლა
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="სახელი" autoComplete="name" error={errors.name?.message} {...register('name')} />
        <FormField label="ელ-ფოსტა" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <FormField label="პაროლი" type="password" autoComplete="new-password" error={errors.password?.message} {...register('password')} />
        <FormField label="გაიმეორეთ პაროლი" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        {serverError && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'მიმდინარეობს...' : 'რეგისტრაცია'}
        </button>
      </form>
    </AuthLayout>
  )
}
