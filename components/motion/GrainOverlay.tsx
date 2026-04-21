interface GrainOverlayProps {
  readonly className?: string
}

/**
 * Static film-grain overlay. Decorative only — `aria-hidden`, not
 * interactive (`pointer-events: none`). The SVG noise is inlined as a
 * data URL so no extra HTTP request is made and no `<img>` markup is
 * inserted.
 */
export default function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      data-grain=""
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: "none" }}
    />
  )
}
