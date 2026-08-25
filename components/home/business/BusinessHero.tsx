/**
 * First fold. Type only — the work photograph lives in its own labelled
 * section so it reads as 実績 rather than decoration.
 */
export default function BusinessHero() {
  return (
    <header className="biz-hero" id="top">
      <div className="biz-hero__type">
        <h1 className="biz-hero__headline">想いを、技術でカタチに。</h1>
        <div className="biz-hero__sub">
          <p className="biz-hero__lede">
            Webサイト・アプリケーションの受託開発、業務へのAI導入支援、
            エンジニアの学習・キャリア支援を行っています。
            ご相談から設計・実装・運用まで、一貫して対応します。
          </p>
          <div className="biz-actions">
            <a className="biz-cta" href="#contact">
              お問い合わせ
            </a>
            <a className="biz-link" href="#services">
              事業内容を見る
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
