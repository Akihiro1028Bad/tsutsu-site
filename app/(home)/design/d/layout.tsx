/**
 * Layout for Design D prototype comparison page.
 *
 * - Hides the parent a/b/c PreviewSwitcher since this page has its own
 *   variant nav (Prototype A / B / C / A+B).
 * - Injects section__edge-accent styles needed by Prototype B.
 *   These styles mirror works__edge-accent from home.css and will be
 *   moved into home.css in subtask-5 when the accents are integrated
 *   into production section components.
 */
export default function DesignDLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <style>{`
        /* Hide the a/b/c design switcher — design/d owns its own variant nav */
        .preview-switcher { display: none !important; }

        /* section__edge-accent: hairline "sheet crease" for Prototype B.
           Mirrors .works__edge-accent in home.css; scoped here until
           subtask-5 lands the styles in the shared stylesheet. */
        .home-root .section__edge-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in oklch, var(--accent) 50%, transparent) 22%,
            color-mix(in oklch, var(--accent) 88%, transparent) 50%,
            color-mix(in oklch, var(--accent) 50%, transparent) 78%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 4;
        }
      `}</style>
      {children}
    </>
  )
}
