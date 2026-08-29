# PR Review: #46 — feat: サイト全体を事業サイトとして再設計

**Reviewed**: 2026-08-28
**Author**: Akihiro1028Bad
**Branch**: feature/design-renewal-blueprint → main
**Decision**: COMMENT(自作PRのため承認は行わない)

## Summary

デザイン刷新として一貫しており、データ層・API・プレビュー機構に手を入れていない点は安全。
CRITICAL / HIGH はなし。ただし旧コンセプト(ブループリント期)からの**取りこぼしが2件**あり、
うち1件は実際の見た目に出る。

## Findings

### CRITICAL
なし。新たなシークレット混入、インジェクション、認証まわりの変更なし。

### HIGH
なし。

### MEDIUM

**M-1. ナビが白い Contact セクション上で暗転する**
`components/home/HomeNav.tsx:20`
```ts
const DARK_SECTIONS: ReadonlySet<string> = new Set(["contact"])
```
これはブループリント期に Contact が青焼き(暗色面)だった頃の設定。
現在の `.biz-contact`(`app/(home)/business.css:338`)は背景指定を持たず白地のため、
Contact までスクロールするとナビだけが `data-theme="dark"` になり、
白いセクションの上に暗いナビが乗る。

現在ホームに暗色セクションは存在しない(フッターは監視対象外)ため、
`DARK_SECTIONS` は空にできる。連動して以下も整理対象:
- `home.css` の `.home-nav[data-theme="dark"]` 一連(死にコードになる)
- `OBSERVED_IDS` から `contact`(テーマ駆動のためだけに監視している)

※ 本セッションはブラウザ計測ツールが不安定だったため、これはコード読解による指摘。
  実機確認を推奨。

**M-2. 削除済みクラスを参照する CSS が残存**
`app/(home)/home.css:376-395`, `:2520`
片付けコミット(c7744e2)の取りこぼし。以下は参照元が存在しない:
- `.journal__label` / `.journal__label-ja` / `.journal__news-head` / `.journal__blog-head`
  → `JournalSection` 削除により未使用
- `[data-style="modern"] .hero__main`
  → `HeroSection` 削除により未使用

### LOW

**L-1. 未使用の CSS 変数**
`--accent-soft` / `--f-hand` / `--f-label` は使用箇所 0。削除可。
(`--f-display` / `--f-jp-display` は下層ページが使用中のため存置が正しい)

**L-2. `data-style="business"` を参照する CSS がない**
`app/(home)/page.tsx:56`。将来のフックとして意図的なら可、そうでなければ削除。

**L-3. `SectionShell` の `moreHref` / `moreLabel` が独立した任意プロパティ**
`components/home/business/SectionShell.tsx:11-12`
`moreHref` のみ渡すとラベル無しのリンクが描画され、支援技術に無名リンクとして露出する。
対で受ける形(`more?: { href: string; label: string }`)にすれば型で防げる。

**L-4. `BusinessWorks` に空状態がない**
News / Blog は 0 件時のメッセージを持つが Works は持たない。
現状 `WORKS_FEATURED` は定数のため実害なし。microCMS 化するなら要追加。

### INFO(差分外・既存)

**I-1. contact API に個人メールアドレスが直書き**
`app/api/contact/route.ts:6` の開発時フォールバック。
本 PR の変更ではないが、公開リポジトリのためソース上に個人情報が残る。
環境変数に寄せるのが望ましい。

## Validation Results

| Check | Result |
|---|---|
| Type check (`pnpm typecheck`) | Pass |
| Lint (`pnpm lint`) | Pass |
| Tests (`pnpm test`) | Pass — 474件 / カバレッジ 100% |
| Build (`pnpm build`) | Pass |
| ルート疎通 | Pass — `/` `/blog` `/announcements` `/works` `/blog/[slug]` すべて 200 |

## 良かった点

- データ取得層・API・microCMS プレビュー機構に一切触れていない(影響範囲が明確)
- `home.css` の CSS 変数名を維持したまま値のみ差し替えたため、未改修ページが壊れずに移行できている
- `[data-style="modern"]` ブロックを「実験ではなく実装」と見出しで明示し、
  依存関係を後任者が誤解しないようにしている
- カバレッジ 100% を維持したまま 5,376 行を削除

## Files Reviewed

82 files(+1,730 / −5,376)。主な対象:
- Added: `components/home/business/**`(7)、`app/(home)/business.css`、`lib/home/business-data.ts`
- Modified: `HomeNav.tsx`、`HomeFooter.tsx`、`ContactForm.tsx`、`app/(home)/page.tsx`、`home.css`、`tailwind.config.js`、`lib/home/tokens.ts`
- Deleted: `app/(home)/design/**`、旧ホームセクション 6 件、孤立 motion 3 件、`.env`
