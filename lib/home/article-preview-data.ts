/**
 * Static fixture used only by the /design/article/{a..e} preview routes.
 * The HTML is hand-written so it exercises every typographic element
 * (title, meta, hero, lead, h2/h3, p, strong/em, link, ul, blockquote,
 * code, table, figure) and each design variant can be judged on the
 * same content.
 */

export const SAMPLE_ARTICLE = {
  id: "sample",
  title: "書くことは、考えることの外形線である",
  dateDisplay: "2026.04.21",
  category: "Writing",
  kicker: "Notes.",
  readingMin: 5,
  heroImage: {
    src: "/services.png",
    alt: "サンプルヒーロー画像",
    width: 2400,
    height: 1500,
  },
  contentHtml: `
    <p>
      書き始めるとき、頭のなかはいつも曇っている。
      <strong>"何を言いたいのか"</strong> が、手を動かす前から明確だったことは、正直ほとんどない。
      文字を並べ始めて、削って、並べ替えて、ようやく "自分はこれが言いたかったのか" と気づく。
      書くという行為は、考えを <em>整える</em> のではなく、考えを <em>外に押し出して、輪郭を描く</em> ことに近い。
    </p>

    <h2>1. まず "下書きの下書き" を書く</h2>
    <p>
      書きにくい原因のほとんどは、"上手く書こう" と思っていることだ。
      整った段落を書こうとすると、手が止まる。書けるのは、整っていない走り書きだけ。
      だから最初は、体裁を全部無視して書いてしまう。論理もテンポも無視していい。
    </p>
    <ul>
      <li>まず思っていることを、全部、箇条書きで出す</li>
      <li>矛盾する内容が並んでも、そのまま置く</li>
      <li>10分で終わらなければ、一旦閉じて翌日に</li>
    </ul>

    <h2>2. 書いた後に "最小の主張" を1文で決める</h2>
    <p>
      書いた後、<a href="#">一文でまとめるとしたら？</a> を自問する。
      この "一文" は、タイトルにも、リードにも、結論にも使える。
      逆に、この一文が書けないときは、記事としてまだ熟していないということ。
      そのときは、書きあがった文章を <strong>構造ではなく素材</strong> として扱い、別の文脈で再利用する。
    </p>

    <blockquote>
      <p>
        書き終わったあとに一文でまとめられないなら、
        それは "まだ考えていない" だけだ。
      </p>
    </blockquote>

    <h3>よくある落とし穴</h3>
    <p>
      書いているうちに、当初の主張から逸れていることはよくある。
      そういう時は、逸れた先を新しい記事として立てた方がよい。
      "全部入り" の記事は、たいてい誰にも刺さらない。
    </p>

    <h2>3. 最後にコードスニペットで締める</h2>
    <p>
      エンジニアの記事であれば、実際に動くコードで締めるとよい。
      読み手は抽象論より、"動く例" を求めている。
    </p>
    <pre><code class="language-typescript">// 書く前に、最小単位の "主張" を関数名にしてしまう
function onePointOfThisPost(): string {
  return "書くことは、考えることの外形線である"
}
</code></pre>

    <p>
      文章の成熟度は、"一文でまとめられるかどうか" で測れる。
      まとまらないうちは、書き続けるしかない。
    </p>
  `,
  siblings: {
    newer: {
      title: "cacheComponent ってなんやねん",
      href: "#",
    },
    older: {
      title: "ChatGPT はどうやって文章を作っているのか",
      href: "#",
    },
  },
} as const
