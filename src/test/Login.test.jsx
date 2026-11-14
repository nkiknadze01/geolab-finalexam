import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthContext'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>,
  )

describe('Login page', () => {
  it('shows yup validation errors for empty and invalid input', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.click(screen.getByRole('button', { name: 'შესვლა' }))
    expect(await screen.findByText('ელ-ფოსტა სავალდებულოა')).toBeInTheDocument()

    await user.type(screen.getByLabelText('ელ-ფოსტა'), 'not-an-email')
    await user.type(screen.getByLabelText('პაროლი'), '123')
    await user.click(screen.getByRole('button', { name: 'შესვლა' }))

    expect(await screen.findByText('არასწორი ელ-ფოსტის ფორმატი')).toBeInTheDocument()
    expect(screen.getByText('პაროლი მინიმუმ 6 სიმბოლოა')).toBeInTheDocument()
  })

  it('shows an error for unknown user and stores no token', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByLabelText('ელ-ფოსტა'), 'nobody@example.com')
    await user.type(screen.getByLabelText('პაროლი'), 'secret123')
    await user.click(screen.getByRole('button', { name: 'შესვლა' }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('ელ-ფოსტა ან პაროლი არასწორია'))
    expect(localStorage.getItem('token')).toBeNull()
  })
})
