export default function Loading() {
  return (
    <main className="archive-page" data-style="modern">
      <header className="archive-page__head section-head section-head--hero">
        <div className="section-head__rule">
          <span>Archive</span>
          <span>Notes</span>
        </div>
        <div className="section-head__jp">
          <h1>Notes.</h1>
          <p className="section-head__en">ブログ</p>
        </div>
        <p className="section-head__lead">読み込み中…</p>
      </header>
      <div className="archive-page__body" aria-busy="true">
        <ul className="journal__blog-list archive-page__list" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="archive-page__skeleton-row">
              <span className="archive-page__skeleton archive-page__skeleton--thumb" />
              <span className="archive-page__skeleton archive-page__skeleton--line" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
