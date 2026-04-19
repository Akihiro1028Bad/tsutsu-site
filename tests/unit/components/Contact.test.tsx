import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('renders the big statement', () => {
    render(<Contact />)
    expect(screen.getByText(/お仕事の/)).toBeInTheDocument()
    expect(screen.getByText(/ご相談はこちら/)).toBeInTheDocument()
  })

  it('shows a primary mailto link', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /@/ })
    expect(link.getAttribute('href')).toMatch(/^mailto:/)
  })

  it('exposes the detailed form behind a disclosure', () => {
    render(<Contact />)
    expect(screen.getByText(/お問い合わせフォーム/)).toBeInTheDocument()
  })
})
