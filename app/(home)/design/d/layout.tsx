/**
 * Layout for Design D prototype comparison page.
 *
 * - Hides the parent a/b/c PreviewSwitcher since this page has its own
 *   variant nav (Prototype A / B / C / A+B).
 */
export default function DesignDLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style>{`
        /* Hide the a/b/c design switcher — design/d owns its own variant nav */
        .preview-switcher { display: none !important; }
      `}</style>
      {children}
    </>
  )
}
