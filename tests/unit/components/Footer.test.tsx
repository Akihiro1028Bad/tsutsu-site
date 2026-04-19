import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('shows large tsutsu logo', () => {
    render(<Footer />)
    expect(screen.getByText(/tsutsu/i)).toBeInTheDocument()
  })

  it('shows mini nav links', () => {
    render(<Footer />)
    ;['Work', 'Services', 'About', 'Blog', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument()
    })
  })

  it('shows current year copyright', () => {
    const year = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
  })

  it('shows open-for-business badge', () => {
    render(<Footer />)
    expect(screen.getByText(/受付中/)).toBeInTheDocument()
  })
})
