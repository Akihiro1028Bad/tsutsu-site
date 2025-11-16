'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Announcement } from '@/lib/types/announcement'

interface AnnouncementBannerClientProps {
  announcement: Announcement
}

export default function AnnouncementBannerClient({
  announcement,
}: AnnouncementBannerClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="backdrop-blur-md bg-white/60 border-b border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
    >
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <Link
          href="/announcements"
          className="block py-4 md:py-5 group hover:bg-white/80 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-xs text-slate-400 font-normal tracking-[0.15em] uppercase mb-1 block">
                お知らせ
              </span>
              <p className="text-sm sm:text-base text-slate-800 font-light group-hover:text-slate-950 transition-colors duration-300">
                {announcement.title}
              </p>
            </div>
            <motion.div
              className="text-slate-400 ml-4 group-hover:text-slate-600 transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

