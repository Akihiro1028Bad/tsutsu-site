import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeaturedWork from '@/components/FeaturedWork'
import { works } from '@/lib/works'

describe('FeaturedWork', () => {
  it('renders section heading with work counter', () => {
    render(<FeaturedWork />)
    expect(screen.getByText(/FEATURED WORK/)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`01 / ${works.length.toString().padStart(2, '0')}`))).toBeInTheDocument()
  })

  it('renders the first work with title, year, and stack', () => {
    render(<FeaturedWork />)
    const work = works[0]
    expect(screen.getByText(work.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(work.year))).toBeInTheDocument()
    work.stack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('links to work external URL with noopener', () => {
    render(<FeaturedWork />)
    const link = screen.getByRole('link', { name: /View Case/i })
    expect(link).toHaveAttribute('href', works[0].url)
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
