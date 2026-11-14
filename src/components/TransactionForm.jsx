import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormField from './FormField'
import { CATEGORIES } from '../utils/finance'

const schema = yup.object({
  title: yup.string().trim().min(2, 'მინიმუმ 2 სიმბოლო').max(40, 'მაქსიმუმ 40 სიმბოლო').required('აღწერა სავალდებულოა'),
  amount: yup
    .number()
    .typeError('შეიყვანეთ რიცხვი')
    .positive('თანხა უნდა იყოს 0-ზე მეტი')
    .required('თანხა სავალდებულოა'),
  type: yup.string().oneOf(['income', 'expense']).required(),
  category: yup.string().required('აირჩიეთ კატეგორია'),
  date: yup.string().required('თარიღი სავალდებულოა'),
})

const today = () => new Date().toISOString().slice(0, 10)
const emptyValues = () => ({ title: '', amount: '', type: 'expense', category: CATEGORIES.expense[0], date: today() })

export default function TransactionForm({ editing, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues: emptyValues() })

  const type = watch('type')

  useEffect(() => {
    reset(editing ? { ...editing } : emptyValues())
  }, [editing, reset])

  const submit = async (values) => {
    await onSubmit({ ...values, title: values.title.trim(), amount: Number(values.amount) })
    reset(emptyValues())
  }

  const typeRegister = register('type', {
    onChange: (e) => setValue('category', CATEGORIES[e.target.value][0]),
  })

  return (
    <form onSubmit={handleSubmit(submit)} className="card space-y-4" noValidate aria-label="ტრანზაქციის ფორმა">
      <h2 className="text-lg font-semibold">{editing ? 'ტრანზაქციის რედაქტირება' : 'ახალი ტრანზაქცია'}</h2>

      <FormField label="აღწერა" placeholder="მაგ: სუპერმარკეტი" error={errors.title?.message} {...register('title')} />

      <div className="grid grid-cols-2 gap-3">
        <FormField label="თანხა (₾)" type="number" step="0.01" error={errors.amount?.message} {...register('amount')} />
        <FormField label="თარიღი" type="date" error={errors.date?.message} {...register('date')} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField as="select" label="ტიპი" error={errors.type?.message} {...typeRegister}>
          <option value="expense">ხარჯი</option>
          <option value="income">შემოსავალი</option>
        </FormField>
        <FormField as="select" label="კატეგორია" error={errors.category?.message} {...register('category')}>
          {CATEGORIES[type === 'income' ? 'income' : 'expense'].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FormField>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1" disabled={isSubmitting}>
          {editing ? 'შენახვა' : 'დამატება'}
        </button>
        {editing && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            გაუქმება
          </button>
        )}
      </div>
    </form>
  )
}
