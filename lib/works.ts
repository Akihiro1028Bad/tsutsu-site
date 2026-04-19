export interface Work {
  id: string
  title: string
  client: string
  year: string
  description: string
  stack: string[]
  url: string
  imageSrc: string
  imageAlt: string
}

/**
 * Featured works shown on the homepage.
 * TODO: populate `imageSrc`/`url`/`client`/`title` with real delivered project
 * once the client provides screenshot and URL (placeholder below to keep build green).
 */
export const works: Work[] = [
  {
    id: 'work-001',
    title: 'Portfolio Website',
    client: 'TBD client name',
    year: '2026',
    description:
      '事業や想いを丁寧にヒアリングし、ブランドに馴染む一枚を設計・実装・納品しました。',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://example.com',
    imageSrc: '/works/placeholder-001.svg',
    imageAlt: 'Portfolio Website screenshot',
  },
]
