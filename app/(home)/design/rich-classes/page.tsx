import type { Metadata } from "next"
import type { ReactNode } from "react"
import HtmlEmbed from "@/components/HtmlEmbed"

export const metadata: Metadata = {
  title: "Rich editor custom classes — preview · tsutsu",
  robots: { index: false, follow: false },
}

interface Variant {
  readonly id: string
  readonly className: string
  readonly label: string
  readonly intent: string
  readonly demo: ReactNode
}

const VARIANTS: readonly Variant[] = [
  {
    id: "a",
    className: "lead",
    label: "A. lead — 冒頭リード文",
    intent: "記事の最初に置く導入文。本文よりやや大きく、柔らかい色で読み手を引き込む。",
    demo: (
      <p className="lead">
        デザインとは課題解決のかたちである。細部の手ざわりに神経をとがらせつつ、全体の構造を見失わないこと。この記事では、その両立をどう設計に落とし込むかを考える。
      </p>
    ),
  },
  {
    id: "b",
    className: "callout",
    label: "B. callout — 注記ボックス",
    intent: "補足情報・参考メモ・サイドノートなど、本文の流れに埋もれさせたくない情報を柔らかく強調。",
    demo: (
      <p className="callout">
        この設定は<strong>開発環境のみ</strong>で有効です。本番環境では{" "}
        <code>NODE_ENV=production</code> が自動的に適用されます。
      </p>
    ),
  },
  {
    id: "c",
    className: "note",
    label: "C. note — インライン注釈",
    intent: "本文の流れを止めずに、短い補足を添えたいとき。モノスペースの「NOTE.」ラベルでエディトリアルな印象。",
    demo: (
      <p className="note">
        この機能は v1.4 から導入されました。古いバージョンでは代替として{" "}
        <code>legacyMode</code> を指定してください。
      </p>
    ),
  },
  {
    id: "d",
    className: "warn",
    label: "D. warn — 警告ブロック",
    intent: "破壊的操作・制約条件・注意喚起など、読み飛ばされるとマズい情報。アクセント色の細いルールで目を引く。",
    demo: (
      <p className="warn">
        このコマンドはローカルの変更を破棄します。<code>git stash</code>{" "}
        で一時保存してから実行するか、<code>--dry-run</code> で事前確認してください。
      </p>
    ),
  },
  {
    id: "e",
    className: "pullquote",
    label: "E. pullquote — ディスプレイ引用",
    intent: "記事の転換点や、キーメッセージを大きく見せたいとき。セリフ書体で紙面のような印象に。",
    demo: <p className="pullquote">良いデザインは、見えないところで仕事をしている。</p>,
  },
  {
    id: "f",
    className: "key",
    label: "F. key — 要点ハイライト",
    intent: "「ここが結論です」と明示したい一文。太めのインクの縦線と「KEY POINT」ラベルで重みを与える。",
    demo: (
      <p className="key">
        プロトタイプの目的は、作ることではなく、捨てられる選択肢を明らかにすることだ。
      </p>
    ),
  },
  {
    id: "g",
    className: "tldr",
    label: "G. tldr — 三行まとめ",
    intent: "長い記事の冒頭や末尾に置く要約。上下のルールで囲み、モノの「TL;DR」ラベルで視認性を確保。",
    demo: (
      <p className="tldr">
        microCMSのカスタムclassは軽量なラベル機構にすぎないが、サイト側のCSSと組み合わせるとエディトリアル性の高いブロックを量産できる。本稿では 12 案を比較した。
      </p>
    ),
  },
  {
    id: "h",
    className: "step",
    label: "H. step — 手順ステップ",
    intent: "チュートリアル・how-to記事向け。CSSカウンターで「STEP 01, 02, 03...」と自動採番される。",
    demo: (
      <>
        <p className="step">microCMS管理画面で API を開き、カスタムclass を追加する。</p>
        <p className="step">サイト側の CSS にクラス定義を追加し、プレビューで確認する。</p>
        <p className="step">入稿ガイドに使用例を記載し、チームに共有する。</p>
      </>
    ),
  },
  {
    id: "i",
    className: "stat",
    label: "I. stat — 数値ハイライト",
    intent: "ケーススタディや実績ページで数値を大きく見せる。直後の段落は自動的に小さなモノキャプションになる。",
    demo: (
      <>
        <p className="stat">340%</p>
        <p>オーガニック流入の増加率（2025年 vs 2024年）</p>
      </>
    ),
  },
  {
    id: "j",
    className: "aside",
    label: "J. aside — 余談・脱線",
    intent: "本筋から外れた補足・個人的な感想・括弧書き的なコメント。点線の縦線 + 斜体で「独り言」感を出す。",
    demo: (
      <p className="aside">
        余談だが、この設計思想は 80 年代の雑誌編集から学んだものだ。紙面の余白は、情報を削るための最後の手段ではなく、読み手に考える時間を与えるための装置だった。
      </p>
    ),
  },
  {
    id: "k",
    className: "update",
    label: "K. update — 更新履歴",
    intent: "公開後の追記・訂正・補足を記事末尾に残したいとき。点線の上ルールと「UPDATE」インラインラベルで控えめに主張。",
    demo: (
      <p className="update">
        2026-04-21 — microCMS 側のリッチエディタ v2 設定手順を更新。カスタムclass のCSS入力欄が存在しないことを追記。
      </p>
    ),
  },
  {
    id: "l",
    className: "divider",
    label: "L. divider — 装飾的セクション区切り",
    intent: "章が変わる・論点が変わる・時間が飛ぶ — そんな転換点に挟む装飾的な区切り。中央に「§」グリフ。",
    demo: <p className="divider">§</p>,
  },
  {
    id: "m",
    className: "epigraph",
    label: "M. epigraph — 題辞",
    intent: "記事冒頭に置く引用。本文には入らない、著者や書籍からの一言を小さな斜体で添える。紙の本の扉ページのよう。",
    demo: (
      <p className="epigraph">
        道具はそれを使う人の思想を映す鏡である。 — 柳宗悦
      </p>
    ),
  },
  {
    id: "n",
    className: "dropcap",
    label: "N. dropcap — ドロップキャップ",
    intent: "段落の最初の一文字をセリフ書体で大きく装飾。エッセイや長文の書き出しに、紙面のような格調を与える。",
    demo: (
      <p className="dropcap">
        かつて雑誌の編集者だった祖父は、ページの余白を「読者に考える時間を渡す装置」と呼んでいた。削れば情報量が減るのではなく、削った分だけ読者の想像が入り込む。引き算の編集こそ設計の本質だ、と。
      </p>
    ),
  },
  {
    id: "o",
    className: "marker",
    label: "O. marker — マーカーハイライト",
    intent: "蛍光マーカーで線を引いたような背景効果。段落全体（あるいは <span> で一部だけ）を柔らかく強調。",
    demo: (
      <p>
        読み返したいフレーズや <span className="marker">忘れたくない一文</span>{" "}
        だけをマーカーで引ける。紙の参考書で付箋を貼った、あの感覚。
      </p>
    ),
  },
  {
    id: "p",
    className: "timeline",
    label: "P. timeline — タイムライン項目",
    intent: "沿革・変更履歴・年表など、日付と項目を対で並べたいとき。左にモノスペースの日付、右に本文。連続で使うとタイムライン化。",
    demo: (
      <>
        <p className="timeline" data-date="2024-08">
          microCMS導入。ブログとお知らせの運用を開始。
        </p>
        <p className="timeline" data-date="2025-03">
          サイトリデザイン。Linear風のエディトリアルトーンへ。
        </p>
        <p className="timeline" data-date="2026-04">
          リッチエディタv2に移行。カスタムclassで表現力を強化。
        </p>
      </>
    ),
  },
  {
    id: "q",
    className: "postscript",
    label: "Q. postscript — 追伸",
    intent: "記事末尾に置く「P.S.」スタイルの余韻。右寄せ・セリフ斜体で手紙の追伸のような親密さを演出。",
    demo: (
      <p className="postscript">
        蛇足だが、この記事を書きながら 3 回コーヒーを淹れ直した。思考と抽出は、似ている。
      </p>
    ),
  },
  {
    id: "r",
    className: "haiku",
    label: "R. haiku — 俳句/詩",
    intent: "短歌・俳句・引用詩など、余白を味わう短文のための中央寄せ書式。改行をそのまま反映。",
    demo: (
      <p className="haiku">
        {"閑かさや\n岩にしみ入る\n蝉の声"}
      </p>
    ),
  },
  {
    id: "s",
    className: "bouten",
    label: "S. bouten — 傍点強調",
    intent: "日本語の文芸的強調手法。太字ではなく、文字の上に点々を打って注意を引く。書籍や文学系記事に相性が良い。",
    demo: (
      <p className="bouten">
        言葉の選び方ひとつで、読み手の受ける印象はまるで違う。
      </p>
    ),
  },
  {
    id: "t",
    className: "question",
    label: "T. question — 問いかけ",
    intent: "FAQ・読者への問いかけ・セルフ対話。大きなセリフ「Q.」がアクセント色で目を引く。answer とペアで使うと効果的。",
    demo: (
      <p className="question">
        良いデザインと、美しいデザインの違いはどこにあるのだろうか？
      </p>
    ),
  },
  {
    id: "u",
    className: "answer",
    label: "U. answer — 回答",
    intent: "question の直後に置く返答。大きな「A.」とやや控えめな本文で、対話的な文章構造を作る。",
    demo: (
      <p className="answer">
        良いデザインは問題を解決する。美しいデザインは、そこに静かな喜びを添える。前者は必要、後者は贅沢、だが人はしばしば後者の方を長く覚えている。
      </p>
    ),
  },
  {
    id: "v",
    className: "wide",
    label: "V. wide — 横幅ブレイクアウト",
    intent: "通常の本文カラムより広い領域を使って、図版的・展示的に見せたい段落。薄い背景で周囲とトーン差をつける。",
    demo: (
      <p className="wide">
        この段落は本文カラムの外側までせり出している。図や大きな引用、視覚的な呼吸を入れたい瞬間のためのレイアウト。読者にページを「めくった」感覚を与えられる。
      </p>
    ),
  },
  {
    id: "w",
    className: "arrow",
    label: "W. arrow — アクション/CTA",
    intent: "「次はこうしよう」「このリンクを開いて」など、読者に行動を促す段落。大きな矢印グリフで指差すように誘導。",
    demo: (
      <p className="arrow">
        次はカスタムclassをmicroCMSに登録し、実際の記事で使ってみてください。
      </p>
    ),
  },
  {
    id: "x",
    className: "boxed",
    label: "X. boxed — 二重罫ボックス",
    intent: "重要告知・キャンペーン・特別メッセージなど、枠で囲って「ここに注目」と明示する古典的な紙面レイアウト。二重罫線でクラシックな印象。",
    demo: (
      <p className="boxed">
        本日より、新サービス「tsutsu atelier」の受付を開始します。初回 5 名様限定で特別な価格で提供します。
      </p>
    ),
  },
  {
    id: "y",
    className: "typewriter",
    label: "Y. typewriter — タイプライター",
    intent: "横罫線の入った原稿用紙のような背景でモノスペース表示。取材メモや脚本の引用など、「生々しい一次情報」の雰囲気を出すとき。",
    demo: (
      <p className="typewriter">
        4月21日 14時03分 — 依頼主から電話。曰く「最初に見せた案が良かったが、角度を 2 度浅くしたい」。レビュー記録を再オープン。
      </p>
    ),
  },
  {
    id: "z",
    className: "redacted",
    label: "Z. redacted — 黒塗り",
    intent: "機密・未公開・伏字の演出。スパン単位で使えば本文内の特定単語だけ黒塗りにもできる。ユーモラスにも厳粛にも使える遊び枠。",
    demo: (
      <p>
        クライアントの名前は <span className="redacted">████████████</span>{" "}
        で、契約金額は <span className="redacted">████████</span> 円。ここでは詳細を伏せる。
      </p>
    ),
  },
  {
    id: "aa",
    className: "ticker",
    label: "AA. ticker — ニュースティッカー",
    intent: "ヘッドライン的に流れる横スクロールバナー（CSSアニメのみ、JS不要）。お知らせトップや速報感のあるパートに。ホバーで停止。",
    demo: (
      <p className="ticker">
        NEW ARRIVAL 2026 — tsutsu atelier 受付開始 / 連載「エッセイの設計」毎週金曜更新 / スタジオ見学予約受付中 / ...
      </p>
    ),
  },
  {
    id: "ab",
    className: "neon",
    label: "AB. neon — ネオンサイン",
    intent: "ダーク背景に光る文字。イベント告知・ナイトライフ・娯楽系コンテンツの強い存在感を演出。エディトリアル路線から一度だけ外れる切り札。",
    demo: <p className="neon">OPEN STUDIO ‘26</p>,
  },
  {
    id: "ac",
    className: "newspaper",
    label: "AC. newspaper — 新聞2段組み",
    intent: "セリフ書体で2カラムに組み、先頭文字はドロップキャップに。長文の回顧録・特集エッセイを新聞紙面風に見せる。",
    demo: (
      <p className="newspaper">
        かつて紙の新聞を毎朝読んでいた頃、文字が段をまたいで折り返すリズムは、それ自体が情報の呼吸だった。段組みは情報の量を制約するのではなく、読者のまなざしに規則を与える装置だった。いま同じ仕掛けをWebに持ち込むと、読む速度が少し遅くなり、そのぶん内容が長く残る。急がない時間を記事の中に作ることは、書き手にも読み手にも贅沢なことだ。
      </p>
    ),
  },
  {
    id: "ad",
    className: "polaroid",
    label: "AD. polaroid — ポラロイド写真",
    intent: "画像を白い厚紙フレームで囲み、わずかに傾けた親密なスタイル。旅行記・日記・制作過程のスナップ写真など、パーソナルな記事に相性◎。ホバーで傾き解除。",
    demo: (
      <p className="polaroid">
        <img
          src="https://picsum.photos/seed/tsutsu-polaroid/640/400"
          alt="Sample polaroid"
        />
        Spring, 2026 — atelier window
      </p>
    ),
  },
  {
    id: "ae",
    className: "sticky",
    label: "AE. sticky — 付箋メモ",
    intent: "黄色い付箋紙にメモを書き留めたような一段。記事に「筆者のつぶやき」を挟みたいときや、制作過程の走り書き感を出したいときに。",
    demo: (
      <p className="sticky">
        あとで確認：この章の挿絵、線画版と写真版どちらが馴染むか、公開前に比較する。
      </p>
    ),
  },
  {
    id: "af",
    className: "terminal",
    label: "AF. terminal — ターミナル出力",
    intent: "コードブロックとは別に、「コマンドを叩いた結果」や「ログ」を示したいとき。「$ 」プレフィックスが自動で付く。黒地緑字で視覚的に明確。",
    demo: (
      <p className="terminal">
        pnpm build &amp;&amp; pnpm test — 14 tests passed in 2.3s
      </p>
    ),
  },
  {
    id: "ag",
    className: "quote-mark",
    label: "AG. quote-mark — 巨大引用符",
    intent: "pullquote の親戚。本文流しの中で「ここは引用」と明示する、装飾的な大きな開き括弧つき。インタビュー記事・書籍レビュー向け。",
    demo: (
      <p className="quote-mark">
        設計とは、選ばなかったものの履歴である。残したものではなく、捨てた判断の軌跡こそが、その仕事の骨格を決める。
      </p>
    ),
  },
  {
    id: "ah",
    className: "centered-bold",
    label: "AH. centered-bold — 中央寄せ太字強調",
    intent: "短いスローガンや、記事のテーマを一言でまとめたフレーズを大胆に中央寄せ。pullquote より直接的・パンチ寄り。",
    demo: (
      <p className="centered-bold">
        削ることは、選ぶことだ。
      </p>
    ),
  },
  {
    id: "ai",
    className: "diagram",
    label: "AI. diagram — モノスペース図解",
    intent: "ASCIIアート・ツリー・フロー・表などの簡易図解を表示。モノ・中央寄せ・薄い背景のコンテナ。改行そのまま保持。",
    demo: (
      <p className="diagram">
        {`    [入稿]        [ビルド]       [公開]
       │             │             │
       ▼             ▼             ▼
   microCMS  →  Next.js  →   Vercel`}
      </p>
    ),
  },
  {
    id: "aj",
    className: "flow",
    label: "AJ. flow — プロセスフロー",
    intent: "step が縦型の手順なら、flow は横型のフェーズ表示。記事の中で「全体はこの 3 段階でできています」と俯瞰させたいときに。",
    demo: <p className="flow">調査 → 設計 → 実装 → 検証 → 公開</p>,
  },
  {
    id: "ak",
    className: "annotation",
    label: "AK. annotation — 注釈ライン",
    intent: "図の下や表のセル脇に添える、細い横線付きの小注釈。技術記事で「※実測値」「※2026年4月時点」など、補足メタ情報を上品に添えたい。",
    demo: (
      <p className="annotation">
        ※ 実測値は社内計測による。公開ベンチマークは別途 Lighthouse v14 スコアを参照。
      </p>
    ),
  },
  {
    id: "al",
    className: "framed",
    label: "AL. framed — フレーム枠",
    intent: "画像や小さな情報ブロックに薄い罫線と右下アクセントの切り欠きを付けるシンプルなフレーム。ギャラリー風の展示感を軽く添える。",
    demo: (
      <p className="framed">
        この情報ブロックは、周囲の本文とは独立した「パネル」として扱われる。図版のメタ情報・参考リンクの束・関連プロジェクト一覧などに。
      </p>
    ),
  },
  {
    id: "am",
    className: "embedHtml",
    label: "AM. embedHtml — HTML埋め込み（iframe）",
    intent:
      "CSS/JSを含むHTMLを別フィールド embedHtml に入れると、記事末尾にサンドボックスiframeで描画されます。サイト本体のスタイル・挙動から完全分離。下はライブデモ。",
    demo: (
      <HtmlEmbed
        minHeight={220}
        html={`<style>
  body { background: linear-gradient(135deg, #fff6a8, #ffd2a8); font-family: system-ui, sans-serif; padding: 24px; }
  .card { background: #fff; border: 1px solid #d9c28e; border-radius: 8px; padding: 20px 24px; max-width: 520px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
  h2 { margin: 0 0 8px; font-size: 18px; color: #2b2716; }
  p  { margin: 0 0 16px; font-size: 14px; color: #3c3524; line-height: 1.7; }
  button { background: #2b2716; color: #fff6a8; border: 0; padding: 10px 18px; border-radius: 4px; cursor: pointer; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; }
  button:hover { background: #000; }
  .count { font-family: ui-monospace, monospace; background: #fff6a8; padding: 2px 8px; border-radius: 3px; }
</style>
<div class="card">
  <h2>インタラクティブな埋め込みデモ</h2>
  <p>このブロック全体は <code>iframe</code> の中で動いています。ボタンを押した回数 : <span class="count" id="c">0</span></p>
  <button id="b">カウントアップ</button>
</div>
<script>
  let n = 0;
  document.getElementById('b').addEventListener('click', () => {
    n++;
    document.getElementById('c').textContent = n;
  });
</script>`}
      />
    ),
  },
]

export default function RichClassesPreviewPage() {
  return (
    <main className="rich-preview">
      <header className="rich-preview__head">
        <p className="rich-preview__kicker">Design preview</p>
        <h1 className="rich-preview__title">
          microCMSカスタムclass デザイン案
        </h1>
        <p className="rich-preview__lede">
          microCMSのリッチエディタで使えるカスタムclassのデザイン案を 6 つ並べています。
          実際の記事ページと同じスタイルが適用されているので、どれを採用するか見比べてください。
        </p>
      </header>

      <div className="rich-preview__grid">
        {VARIANTS.map((v) => (
          <section key={v.id} className="rich-preview__card">
            <div className="rich-preview__card-meta">
              <p className="rich-preview__card-label">{v.label}</p>
              <p className="rich-preview__card-code">
                <code>{`<p class="${v.className}">...</p>`}</code>
              </p>
              <p className="rich-preview__card-intent">{v.intent}</p>
            </div>
            <div className="article-prose rich-preview__card-demo">
              {v.demo}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
