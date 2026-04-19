import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Services from '@/components/Services'

describe('Services', () => {
  it('renders section heading with service count', () => {
    render(<Services />)
    expect(screen.getByText(/SERVICES/)).toBeInTheDocument()
    expect(screen.getByText(/4 services/)).toBeInTheDocument()
  })

  it('lists four services with numbers', () => {
    render(<Services />)
    ;['Webサイト制作', 'Webアプリ', '業務改善', '学習支援'].forEach((keyword) => {
      expect(screen.getAllByText(new RegExp(keyword)).length).toBeGreaterThan(0)
    })
    ;['01', '02', '03', '04'].forEach((n) => {
      expect(screen.getByText(n)).toBeInTheDocument()
    })
  })
})
