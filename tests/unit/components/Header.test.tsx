import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Header from '@/components/Header'

describe('Header', () => {
  beforeEach(() => {
    window.scrollY = 0
  })

  it('renders logo with lime dot', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /tsutsu/i })).toBeInTheDocument()
  })

  it('shows desktop nav links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /Work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument()
  })

  it('adds scrolled styling after 16px scroll', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).not.toHaveClass('border-b')

    window.scrollY = 32
    fireEvent.scroll(window)
    expect(header).toHaveClass('border-b')
  })

  it('toggles mobile menu', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /メニュー|menu/i })
    fireEvent.click(toggle)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /閉じる|close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
