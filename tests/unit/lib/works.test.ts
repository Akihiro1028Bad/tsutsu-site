import { describe, it, expect } from 'vitest'
import { works } from '@/lib/works'

describe('works data', () => {
  it('exports at least one work entry', () => {
    expect(works.length).toBeGreaterThan(0)
  })

  it('each work has required fields', () => {
    for (const work of works) {
      expect(work.id).toBeTruthy()
      expect(work.title).toBeTruthy()
      expect(work.client).toBeTruthy()
      expect(work.year).toBeTruthy()
      expect(work.url).toMatch(/^https?:\/\//)
      expect(work.imageSrc).toBeTruthy()
      expect(Array.isArray(work.stack)).toBe(true)
    }
  })
})
