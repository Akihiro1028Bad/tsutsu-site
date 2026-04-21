interface WorksComingSoonProps {
  /** Next-in-line index number shown on the placeholder row (defaults to 002). */
  readonly indexNumber?: string
}

/**
 * Placeholder row that visually continues the Works index as the "next"
 * entry. Matches the row grid so the list doesn't feel empty when only a
 * few works are published yet.
 */
export default function WorksComingSoon({
  indexNumber = "002",
}: WorksComingSoonProps) {
  return (
    <section className="coming coming--row" aria-label="Coming soon">
      <div className="coming__placeholder" aria-hidden="true">
        <span className="coming__index">{indexNumber}</span>
        <span className="coming__frame" />
      </div>
      <div className="coming__body">
        <h4>Next works, coming</h4>
        <p>
          現在進行中の案件、そして公開準備中のものが数件あります。
          <br />
          掲載は順次。
        </p>
      </div>
    </section>
  )
}
