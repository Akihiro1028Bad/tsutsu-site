/**
 * Editorial first-fold. Server-only — entirely static text + ambient marks.
 */
export default function HeroSection() {
  return (
    <header id="top" className="hero hero--wrap">
      <div className="hero__grid">
        <div className="hero__title-block">
          <h1 className="hero__main">
            <span className="hero__main-line">想いを</span>
            <span className="hero__main-line">
              <em className="hero__em">技術</em>で
            </span>
            <span className="hero__main-line">カタチに。</span>
          </h1>
        </div>
        <div className="hero__sub-row">
          <p className="hero__sub">
            <span className="hero__services-inline">
              WEBサイト制作 ／ アプリ開発 ／ AIソリューション ／
              学習・開発支援
            </span>
            一人ひとりの
            <span className="hero__mark">アイデアに寄り添い</span>、
            <br />
            最新技術でその実現をサポートします。
          </p>
        </div>
      </div>
    </header>
  )
}
