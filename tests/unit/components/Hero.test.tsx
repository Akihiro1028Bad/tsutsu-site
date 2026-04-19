import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the three-line headline with lime-highlighted 技術', () => {
    render(<Hero />)
    expect(screen.getByText(/想いを/)).toBeInTheDocument()
    expect(screen.getByText(/カタチにします/)).toBeInTheDocument()
    const highlight = screen.getByText(/^技術$/)
    expect(highlight).toHaveClass('lime-highlight')
  })

  it('shows eyebrow tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/INDEPENDENT DEVELOPER/i)).toBeInTheDocument()
  })

  it('shows a single primary CTA linking to #contact', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /無料で相談/ })
    expect(cta).toHaveAttribute('href', '/#contact')
  })
})
