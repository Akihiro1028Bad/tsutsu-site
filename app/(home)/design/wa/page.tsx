import type { Metadata } from "next"
import { Zen_Old_Mincho } from "next/font/google"
import "./wa.css"

/**
 * 和モダン方向のヒーロー比較プレビュー。
 * 本番 UX ではなく方向性の目視評価用のため noindex。
 */
const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500", "600", "700"],
  variable: "--font-zen-old-mincho",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "和モダン方向 — ヒーロー比較 · tsutsu",
  description: "日本的な意匠に寄せたヒーローの方向性比較プレビュー。",
  robots: { index: false, follow: false },
}

export default function WaDesignPage() {
  return (
    <main className={`wa ${zenOldMincho.variable}`}>
      {/* ============ A. 原稿用紙 × 明朝 ============ */}
      <section className="wa--genko">
        <div className="wa__label">
          <span>A ─ 原稿用紙 × 明朝</span>
          <b>推奨:設計図コンセプトの和訳</b>
        </div>
        <div className="wa__stage">
          <div className="wa__inner">
            <div className="wa__tate-col">
              <span className="wa__tate">二〇二六年 ／ 設計録</span>
            </div>
            <div>
              <span className="wa__eyebrow">Design &amp; Build — Tsutsumi Akihiro</span>
              <h1 className="wa__headline">
                想いを、
                <br />
                <em>技術</em>で
                <br />
                カタチに。
              </h1>
              <p className="wa__lede">
                Webサイトも、業務のAI化も、エンジニアへの一歩も。
                <br />
                まず一緒に、設計図を描くところから始めます。
              </p>
              <div className="wa__meta">
                <hr className="wa__rule" />
                <span className="wa__services">
                  Webサイト制作 ／ AI導入支援 ／ 学習・キャリア伴走
                </span>
                <div className="wa__cta-row">
                  <a className="wa__cta" href="#contact">
                    無料で相談する
                  </a>
                  <a className="wa__cta-ghost" href="#works">
                    仕事を見る
                  </a>
                  <span className="wa__seal" aria-hidden="true">
                    堤
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ B. 縦組み主役 ============ */}
      <section className="wa--tate">
        <div className="wa__label">
          <span>B ─ 縦組み主役</span>
          <b>最も日本的・最も攻めた案</b>
        </div>
        <div className="wa__stage">
          <div className="wa__inner">
            <div className="wa__side">
              <span className="wa__eyebrow">Freelance Engineer</span>
              <p className="wa__name">堤 暁寛</p>
              <p className="wa__lede">
                Webサイトも、AIの導入も、学びの伴走も。
                <br />
                つくるものは違っても、やることは同じです。
                <br />
                まず、あなたの想いを図面に起こします。
              </p>
              <hr className="wa__rule" />
              <span className="wa__services">
                Web制作 ／ AI導入支援 ／ 学習伴走
              </span>
              <div className="wa__cta-row">
                <a className="wa__cta" href="#contact">
                  無料で相談する
                </a>
                <span className="wa__seal" aria-hidden="true">
                  堤
                </span>
              </div>
            </div>
            <h1 className="wa__tate-headline">
              想いを、<em>技術</em>でカタチに。
            </h1>
          </div>
        </div>
      </section>

      {/* ============ C. 墨と余白 ============ */}
      <section className="wa--sumi">
        <div className="wa__label">
          <span>C ─ 墨と余白</span>
          <b>静かな高級感・ミニマル和モダン</b>
        </div>
        <div className="wa__stage">
          <div className="wa__inner">
            <span className="wa__dot" aria-hidden="true" />
            <h1 className="wa__headline">
              想いを、<em>技術</em>でカタチに。
            </h1>
            <p className="wa__lede">
              Webサイト制作、AI導入支援、学習・キャリア伴走。
              <br />
              フリーランスエンジニア 堤 暁寛
            </p>
            <div className="wa__foot">
              <span className="wa__eyebrow">Since 2021 — Tokyo, Japan</span>
              <a className="wa__cta-ghost" href="#contact">
                相談する →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
