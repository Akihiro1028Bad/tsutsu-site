import type { Metadata } from "next"
import { Zen_Old_Mincho } from "next/font/google"
import "./jp.css"

/**
 * モダン・ジャパニーズ方向のヒーロー比較プレビュー。
 * 和の意匠を足すのではなく、文字組みの精度と余白で「らしさ」を出す。
 * 本番 UX ではなく方向性の目視評価用のため noindex。
 */
const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500"],
  variable: "--font-zen-old-mincho",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "モダン・ジャパニーズ方向 — ヒーロー比較 · tsutsu",
  description: "余白と文字組みで日本的な品位を出す方向の比較プレビュー。",
  robots: { index: false, follow: false },
}

export default function JpDesignPage() {
  return (
    <main className={`jp ${zenOldMincho.variable}`}>
      {/* ============ D. 余白と精度 ============ */}
      <section className="jp--ma">
        <div className="jp__label">
          <span>D ─ 余白と精度</span>
          <b>和の意匠ゼロ。引き算だけで品位を出す</b>
        </div>
        <div className="jp__stage">
          <div className="jp__inner">
            <div className="jp__col">
              <span className="jp__eyebrow">Design &amp; Development</span>
              <h1 className="jp__headline">
                想いを、技術でカタチに。
              </h1>
              <p className="jp__lede">
                Webサイト制作、業務のAI化、学習とキャリアの伴走。
                <br />
                つくるものは違っても、やることは同じです。まず一緒に、
                設計図を描くところから始めます。
              </p>
              <hr className="jp__rule" />
              <span className="jp__services">
                Webサイト制作 ／ AI導入支援 ／ 学習・キャリア伴走
              </span>
              <div className="jp__cta-row">
                <a className="jp__cta" href="#contact">
                  無料で相談する
                </a>
                <a className="jp__cta-ghost" href="#works">
                  実績を見る
                </a>
              </div>
            </div>
            <div className="jp__index">
              <b>Tsutsumi Akihiro</b>
              Freelance Engineer
              <br />
              Tokyo, Japan
            </div>
          </div>
        </div>
      </section>

      {/* ============ E. 明朝を一箇所だけ ============ */}
      <section className="jp--kaori">
        <div className="jp__label">
          <span>E ─ 明朝を一箇所だけ</span>
          <b>推奨:ゴシック主体、和は香り程度</b>
        </div>
        <div className="jp__stage">
          <div className="jp__inner">
            <span className="jp__eyebrow">
              Design &amp; Development — Since 2021
            </span>
            <h1 className="jp__headline">
              想いを、技術でカタチに。
            </h1>
            <p className="jp__mincho">
              一人ひとりの想いに、<em>寸法</em>を。
            </p>
            <p className="jp__lede">
              Webサイトも、業務のAI化も、エンジニアへの一歩も。
              <br />
              まず一緒に、設計図を描くところから始めます。
            </p>
            <hr className="jp__rule" />
            <span className="jp__services">
              Webサイト制作 ／ AI導入支援 ／ 学習・キャリア伴走
            </span>
            <div className="jp__cta-row">
              <a className="jp__cta" href="#contact">
                無料で相談する
              </a>
              <a className="jp__cta-ghost" href="#works">
                実績を見る
              </a>
              <span className="jp__seal" aria-hidden="true">
                堤
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ F. ブループリント洗練 ============ */}
      <section className="jp--refine">
        <div className="jp__label">
          <span>F ─ ブループリント洗練</span>
          <b>現行の延長。方眼を極薄にし、太さを落とす</b>
        </div>
        <div className="jp__stage">
          <div className="jp__inner">
            <div className="jp__col">
              <span className="jp__eyebrow">
                DWG-2026 — Portfolio of Tsutsumi Akihiro
              </span>
              <h1 className="jp__headline">
                想いを、<em>技術</em>でカタチに。
              </h1>
              <p className="jp__lede">
                Webサイトも、業務のAI化も、エンジニアへの一歩も。
                <br />
                まず一緒に、設計図を描くところから始めます。
              </p>
              <hr className="jp__rule" />
              <div className="jp__cta-row">
                <a className="jp__cta" href="#contact">
                  無料で相談する
                </a>
                <a className="jp__cta-ghost" href="#works">
                  図面を見る
                </a>
                <span className="jp__seal" aria-hidden="true">
                  堤
                </span>
              </div>
            </div>
            <div className="jp__fig">
              <span className="jp__fig-title">Fig. 01 — Service Map</span>
              <ul className="jp__fig-list">
                <li>
                  <span className="jp__tick" aria-hidden="true" />
                  Webサイト制作
                </li>
                <li>
                  <span className="jp__tick" data-accent="shu" aria-hidden="true" />
                  AI導入支援
                </li>
                <li>
                  <span className="jp__tick" aria-hidden="true" />
                  学習・キャリア伴走
                </li>
              </ul>
              <div className="jp__fig-foot">Scale 1:1 / Drawn by 堤</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
