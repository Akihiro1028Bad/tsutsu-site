'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { works } from '@/lib/works'

export default function FeaturedWork() {
  const total = works.length
  const work = works[0]
  if (!work) return null

  return (
    <section id="work" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="h-section whitespace-pre-line text-[clamp(3rem,8vw,7rem)]">
            {'FEATURED\nWORK'}
          </h2>
          <span className="mono-tag text-ink/50">
            01 / {total.toString().padStart(2, '0')}
          </span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="group"
        >
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label={`${work.title} - View Case`}
          >
            <div className="overflow-hidden border-8 border-ink bg-ink">
              <div className="relative aspect-video w-full">
                <Image
                  src={work.imageSrc}
                  alt={work.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </div>

            <div className="mt-6 flex items-baseline justify-between">
              <p className="mono-tag text-ink/50">
                #{work.id.toUpperCase()} · {work.client} · {work.year}
              </p>
            </div>

            <h3 className="h-section mt-2 text-[clamp(1.75rem,4vw,3rem)]">
              {work.title}
            </h3>

            <div className="mt-4 h-px w-24 bg-ink/20" />

            <p className="mt-4 max-w-2xl text-base text-ink/70 md:text-lg">
              {work.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {work.stack.map((tech) => (
                <li key={tech} className="mono-tag text-ink/60">
                  {tech}
                </li>
              ))}
            </ul>

            <span className="mono-tag mt-8 inline-flex items-center gap-1 text-ink after:block after:h-px after:w-0 after:bg-lime-500 after:transition-all group-hover:after:w-12">
              View Case <span aria-hidden>→</span>
            </span>
          </a>
        </motion.article>
      </div>
    </section>
  )
}
