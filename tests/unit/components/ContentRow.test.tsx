import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContentRow from '@/components/ContentRow'

describe('ContentRow', () => {
  it('renders date and title linked to href', () => {
    render(
      <ContentRow
        date="2026-04-19"
        title="タイトルです"
        href="/blog/test-slug"
      />,
    )
    const link = screen.getByRole('link', { name: /タイトルです/ })
    expect(link).toHaveAttribute('href', '/blog/test-slug')
    expect(screen.getByText('2026.04.19')).toBeInTheDocument()
  })
})
