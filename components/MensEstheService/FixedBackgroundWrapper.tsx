"use client"

import Image from "next/image"

import { MENS_ESTHE_CONFIG } from "@/lib/constants/config"

type FixedBackgroundWrapperProps = {
  children: React.ReactNode
}

export function FixedBackgroundWrapper({ children }: FixedBackgroundWrapperProps) {
  return (
    <div className="relative">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <Image
          src={MENS_ESTHE_CONFIG.IMAGES.sections}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
          priority={false}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Scrolling Content */}
      <div
        className="relative z-10"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
