import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/AuthContext'

describe('Navbar burger menu', () => {
  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(screen.queryByRole('navigation', { name: 'მობილური ნავიგაცია' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'მენიუს გახსნა' }))
    expect(screen.getByRole('navigation', { name: 'მობილური ნავიგაცია' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'მენიუს დახურვა' }))
    expect(screen.queryByRole('navigation', { name: 'მობილური ნავიგაცია' })).not.toBeInTheDocument()
  })
})
