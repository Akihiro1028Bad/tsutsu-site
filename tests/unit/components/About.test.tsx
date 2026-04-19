import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from '@/components/About'

describe('About', () => {
  it('renders the section heading and name', () => {
    render(<About />)
    expect(screen.getByText(/ABOUT/)).toBeInTheDocument()
    expect(screen.getByText(/TSUTSUMI AKIHIRO/i)).toBeInTheDocument()
  })

  it('renders career numbers', () => {
    render(<About />)
    expect(screen.getByText(/年間の現場経験/)).toBeInTheDocument()
    expect(screen.getByText(/年前にエンジニア転身/)).toBeInTheDocument()
    expect(screen.getByText(/独立/)).toBeInTheDocument()
    expect(screen.getByText('2025.08')).toBeInTheDocument()
  })

  it('lists tech stack chips', () => {
    render(<About />)
    expect(screen.getByText('USING')).toBeInTheDocument()
    ;['Next.js', 'React', 'TypeScript', 'Tailwind'].forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })
})
