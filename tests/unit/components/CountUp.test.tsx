import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CountUp from '@/components/CountUp'

describe('CountUp', () => {
  it('renders the target value immediately when animation disabled', () => {
    render(<CountUp value={42} animate={false} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders a static string value as-is', () => {
    render(<CountUp value="2025.08" animate={false} />)
    expect(screen.getByText('2025.08')).toBeInTheDocument()
  })
})
