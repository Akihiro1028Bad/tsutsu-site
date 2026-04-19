# ホームページ刷新デザイン仕様

- **作成日**: 2026-04-19
- **対象**: `/` (トップページ) + ヘッダー / フッター + 共通デザイントークン
- **対象外**: `/blog/[slug]`, `/announcements/[slug]`, `/services/mens-esthe/*` などの詳細ページ（別タスク）
- **実装ブランチ**: `design/homepage-redesign`（本ドキュメントもここにコミット）

## 1. ゴールと前提

### 達成したいこと（優先度順）

1. 個人事業主としてのブランド強化（格・信頼感）
2. 問い合わせ数 / コンバージョンの向上
3. 他の個人開発者サイトとの差別化

### ターゲット

中小企業の経営者、他の個人事業主 / フリーランス、スタートアップ発注担当、特定業種オーナー（メンズエステ等）、エンジニアを目指す個人 — 幅広い層。

### スコープ制約

- 既存のデータ取得ロジック（microCMS 連携、`AnnouncementSection` / `BlogSection` のデータ層）は再利用する
- Next.js 16 / React 19 / Tailwind CSS 3 / Framer Motion の既存スタックを維持
- モバイル / タブレット / デスクトップのレスポンシブ対応は必須

## 2. デザイン言語

### パーソナリティ

**Bold / Modern / Brutalist Editorial** — 大胆・実験的・編集誌的。Stripe や Anthropic に近い現代性 + 新聞・雑誌のタイポグラフィ主義。

### カラーシステム（Mono + Lime）

| 用途 | 値 |
|---|---|
| 背景ベース | `#fafaf7`（わずかに温かい off-white） |
| 前景・ブラック | `#0a0a0a` |
| アクセント（Lime） | `#d0ff3a` |
| グレー 500 | `#6b7280` |
| グレー 400 | `#9ca3af` |
| グレー 200 | `#e5e5e5` |

**使用ルール**:
- Lime は「1 画面に 1 箇所」を原則とする（見出しの 1 フレーズ、または CTA）
- ボタン以外の要素の角は原則 **直角**
- ボタンは pill（`rounded-full`）

### タイポグラフィ

| 用途 | フォント | ウェイト |
|---|---|---|
| 日本語 見出し | Noto Sans JP | 900 |
| 日本語 本文 | Noto Sans JP | 400 / 500 |
| 欧文 見出し | Inter Display（または Geist） | 900 / 800 |
| 欧文 本文 | Inter | 400 / 500 |
| 欧文 モノ | Geist Mono | 500 |

**原則**:
- 中間サイズを減らし、特大 × 極小のコントラストで構成する
- 行送りは日本語で 1.4〜1.6、見出しで 0.95〜1.1 に締める
- 見出しは `letter-spacing: -0.02em` 〜 `-0.04em` でタイトに
- モノはセクション番号、タグ、日付、meta 情報に限って使用

### 余白

- セクション間の垂直余白は `clamp(6rem, 12vw, 12rem)` を基準
- 左右 padding は `clamp(1.5rem, 6vw, 8rem)` を基準（大画面ほど広く）
- 特大タイポには十分な左右余白を確保し、中央に吸い込まれる構図を避ける

### モーション

**全体方針**: ヒーローは静か、以降のセクションに軽い反応 / リビールを配置。

| 用途 | 仕様 |
|---|---|
| セクション進入 | `IntersectionObserver` で `translateY(40px)` → 0 + fade、duration 0.6s |
| 特大タイポの初回表示 | fade のみ、duration 0.8s |
| カード / リスト行 | stagger 80ms で順次リビール |
| ホバー（ボタン） | `translateY(-2px)`、アンダーライン伸長 |
| ホバー（画像） | `translateY(-4px)` + `scale(1.01)`、duration 0.3s |
| 数字カウントアップ | About セクションの数字に対して 0 → 目標値、duration 0.8s |

既存の `Framer Motion` を使用、`prefers-reduced-motion` に従う。

### 画像方針

- 必要最小限。**ヒーローに画像は置かない**（タイポで語る）
- Featured Work のスクリーンショットは `aspect-ratio: 16/9` + 黒フレームで括る
- すべての画像は直角（`rounded-none`）。ボタン以外で丸みを使わない

## 3. ページ全体の骨格

```
[Sticky Header]
[HERO — Brutalist Huge Type]
[LARGE MARQUEE — 黒背景 / Lime 文字]
[FEATURED WORK]
[SERVICES]
[ABOUT]
[ANNOUNCEMENTS + BLOG]
[CONTACT]
[Footer]
```

**既存からの変更点**:

| セクション | 変更内容 |
|---|---|
| `Hero` | 全面刷新（Brutalist 化） |
| `LargeTextMarquee` | 現状維持（配置そのまま） |
| **`FeaturedWork`（新規）** | 新しくセクションコンポーネントを追加 |
| `Services` | 数字ナンバリング付きエディトリアル型に変更 |
| `About` | 数字 + ステートメントの二段構成に再設計 |
| `AnnouncementSection` + `BlogSection` | リスト型に置き換え、2 カラム配置 |
| `Contact` | 超特大ステートメント + メール直リンクを主 CTA に |
| `Header` / `Footer` | ミニマル再設計 |

## 4. セクション仕様

### 4.1 Header

- 高さ 64px、`sticky top-0`、`backdrop-blur`
- 初期は背景 `#fafaf7` + 透明、スクロール 16px 超で `#ffffff` + `border-bottom: 1px solid #e5e5e5` に変化
- ロゴ: `tsutsu.` の `.` が lime 色、2 秒に 1 回やわらかく ping
- ナビゲーション: `Work / Services / About / Blog / Contact`（右寄せ）
- モバイルはハンバーガー → 全画面黒オーバーレイメニュー（メニュー項目は特大タイポ）

### 4.2 Hero

**コピー**:
- eyebrow: `INDEPENDENT DEVELOPER — TOKYO`
- 本文 3 行:
  - 想いを
  - [LIME highlight]技術[/LIME]で
  - カタチにします。
- サブコピー: 一人ひとりのアイデアに寄り添い、最新技術で実現をサポートします。
- CTA: `無料で相談 →`（pill、`bg: #0a0a0a`、`text: #d0ff3a`）

**レイアウト**:
- 高さ: `min-height: 90vh`（モバイル）/ `100vh`（デスクトップ）
- 左寄せ、左右 padding は前述の標準
- 見出しサイズ: `clamp(3rem, 10vw, 9rem)`
- Lime ハイライトは `技術` を包む蛍光長方形、`rotate(-1deg)`、`padding: 0 0.15em`
- 背景に 1px grid の薄いオーバーレイ（opacity 0.04）
- 右下に `↓ SCROLL` + `01–07`（縦組みモノ）

**モーション**: fade in + 20px translateY。一度表示したら動かない。

### 4.3 Large Marquee（既存）

- 黒背景 `#0a0a0a` + Lime 文字
- 文言: `WEB · APP · SYSTEM · CAREER`（リピート）
- 既存 `LargeTextMarquee` を再利用、色のみデザイントークンに合わせて更新

### 4.4 Featured Work（新規）

**見出し行**:
- 左: `FEATURED WORK`（`clamp(3rem, 8vw, 7rem)` 特大）
- 右: `01 / 01`（モノカウンタ）

**カード（1 件）**:
- `aspect-ratio: 16/9` のスクリーンショット画像、黒フレーム 8px
- 画像下の meta 行: `#001  CLIENT NAME  ·  2026`（モノ、グレー 500）
- プロジェクト名（2vw サイズ）
- 1 行説明 + 使用技術チップ（モノ）
- CTA: `View Case →`（lime underline がホバーで左→右に伸長）
- **リンク先**: 納品済みサイトの外部 URL（詳細ページは作らない）

**データ**:
- 初期実装はコンポーネント側に 1 件ハードコード
- 将来複数件になる場合は `lib/works.ts` に抽出する余地を残す

**モーション**: スクロール進入時に画像 translateY 60px → 0 + fade、ホバーで浮く。

### 4.5 Services

**見出し行**:
- 左: `SERVICES`（特大）
- 右: `4 services`（モノ、グレー 500）

**各サービス行**:

```
01 ─────  Webサイト制作         [説明文]              [詳細 →]
02 ─────  Webアプリ / システム開発  [説明文]              [詳細 →]
03 ─────  業務改善・自動化         [説明文]              [詳細 →]
04 ─────  学習支援・キャリア支援    [説明文]              [詳細 →]
```

- `grid-template-columns: 60px 2fr 3fr auto`（デスクトップ）
- モバイルは縦積み（番号 → タイトル → 説明 → CTA）
- 番号の右に Lime の短い罫線（幅 40px）
- 行間に細い border（`#e5e5e5`）
- CTA:
  - 詳細ページがあるサービス（`/services/mens-esthe` など）は `詳細 →` → 該当ページ
  - 無いものは `お問い合わせ →` → `/#contact`
- サービス 4 件とコピーは既存コンポーネント（`components/Services.tsx`）から引き継ぐ

**モーション**: 行ごとに stagger 80ms、`translateX(-20px) → 0` + fade。

### 4.6 About

**見出し行**:
- 左: `ABOUT`（特大）
- 右: `TSUTSUMI AKIHIRO`（モノ）

**数字ブロック**（4 項目、履歴書型）:

| 数字 | ラベル |
|---|---|
| `04` | 年間の現場経験 |
| `03` | 年前にエンジニア転身 |
| `2025.08` | 独立 & 個人事業主へ |
| `01` | 現在の拠点（Tokyo） |

- 数字は `clamp(3rem, 6vw, 6rem)` 特大
- 右に日本語ラベル、モノのキャプション付き
- 各行の間に細い罫線

**ステートメント**（2〜3 段落）:
既存の About 文言（4 年の現場経験 → 独学 → 転身 → 独立）をベースに、個人事業主としての立ち位置を 2〜3 段落で語る本文。

**Tech stack chips**:
- 見出し: `USING`（モノ、小）
- 一覧: `Next.js · React · TypeScript · Tailwind · Supabase · microCMS · Vercel · Figma` 等
- モノ体、Lime underline

**写真**: 今回はなし。将来導入する場合は About セクション左側にスペースを設けやすい構造にしておく。

**モーション**: 数字はスクロール進入時にカウントアップ、ステートメントは fade。

### 4.7 Announcements + Blog（2 カラム）

**見出し行**: 左に `LATEST`（特大）、右は空白。

**カラム構造**:

```
ANNOUNCEMENTS  [+ すべて]    │    BLOG  [+ すべて]
─────────────────────────   │   ─────────────────────────
2026.04.19                  │   2026.04.10
お知らせタイトル              │   ブログタイトル
                            │
2026.04.12                  │   2026.03.28
お知らせタイトル 2            │   ブログタイトル 2
                            │
2026.04.01                  │   2026.03.15
お知らせタイトル 3            │   ブログタイトル 3
```

- 各カラムは最新 3 件、日付 + タイトルのみ
- タイトルにホバーで lime underline
- 各カラム右肩に `[+ すべて]` ボタン → `/announcements`, `/blog`
- モバイルは縦積み（Announcements → Blog）
- 既存の `AnnouncementSection` / `BlogSection` のデータ取得層を再利用、表示を `ContentCard` から新しいリスト行コンポーネント（仮称 `ContentRow`）に置き換える

### 4.8 Contact

```
お仕事の
ご相談はこちら。                 ← clamp(3rem, 8vw, 8rem)

────────────

[hello@tsutsumi.jp →]           ← 大きな Lime ボタン、mailto: 直リンク
または
[お問い合わせフォーム →]          ← 副導線、既存フォームへ
```

- 見出し左寄せ、下に CTA ボタン 2 つ
- Lime ボタン（`bg: #d0ff3a`、`text: #0a0a0a`、特大 padding）がメイン導線
- 既存のフォーム（`Contact.tsx`）は**残す**。フォーム自体は別セクションとして下部に展開するか、ボタン押下で展開する
- メールアドレスは実装時に確定（ユーザー確認必要）

### 4.9 Footer

```
tsutsu.                                          ← 大きめロゴ（特大、黒）

Work · Services · About · Blog · Contact         ← ミニナビ

© 2026 tsutsumi akihiro                 [● 受付中]  ← 右端に lime dot
```

- 背景は `#0a0a0a`、前景 `#fafaf7`
- ロゴは Lime `.`
- 営業中バッジは lime dot + `受付中` テキスト

## 5. レスポンシブブレイクポイント

| ブレイクポイント | 幅 | 主な変更 |
|---|---|---|
| モバイル | ~ 768px | すべて縦積み、見出し `clamp(2.5rem, 12vw, 4rem)` |
| タブレット | 768 – 1024px | 2 カラム部分は 2 カラム維持、グリッド維持 |
| デスクトップ | 1024px ~ | フル表示 |

Hero の特大タイポはビューポート幅に応じて `vw` で滑らかにスケール。

## 6. アクセシビリティ

- **コントラスト比**: 本文は `#0a0a0a` on `#fafaf7` で WCAG AAA。Lime ハイライトに黒テキストを載せる場合 AAA を満たす（`#d0ff3a` on `#0a0a0a`）
- **フォーカス可視化**: すべてのインタラクティブ要素に lime の 2px outline を付与
- **キーボードナビ**: Tab 順序が論理的であること
- **`prefers-reduced-motion`**: 設定が有効な場合、すべてのモーションを無効化（fade のみ維持）
- **スクリーンリーダー**: 装飾的な `.` やマーキーは `aria-hidden`
- **見出し階層**: `h1` はヒーロー、各セクションは `h2`

## 7. 実装上の構成

### 新設コンポーネント

- `components/FeaturedWork.tsx`（新規）
- `components/ContentRow.tsx`（AnnouncementSection / BlogSection のリスト行を共通化）

### 刷新するコンポーネント

- `components/Hero.tsx`
- `components/Services.tsx`
- `components/About.tsx`
- `components/Contact.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/AnnouncementSection.tsx` / `components/AnnouncementSectionClient.tsx`
- `components/BlogSection.tsx` / `components/BlogSectionClient.tsx`

### 維持する既存ロジック

- microCMS 連携（`lib/microcms.ts` 等）
- `LargeTextMarquee`（色トークンだけ更新）
- `AnnouncementSection` / `BlogSection` のデータ取得部分

### デザイントークン

新規または更新:

- `tailwind.config.js` に `colors.lime`, `colors.ink`, `colors.paper` を追加
- `app/globals.css` にタイポグラフィの共通クラスを定義（`h-display`, `h-section`, `mono-tag` など）
- Google Fonts / next/font で `Noto Sans JP` + `Inter` + `Geist Mono` を読み込む

## 8. テスト方針

- **ビジュアルテスト**: 実装後、dev サーバーで各ブレイクポイント（モバイル / タブレット / デスクトップ）を目視確認
- **型チェック / Lint**: `pnpm lint` で 0 警告
- **既存ユニット / E2E**: `pnpm test` が引き続きパスすること。壊れた既存テストは更新
- **Lighthouse**: Performance / Accessibility / Best Practices / SEO を 90+ を目安
- **A11y**: `prefers-reduced-motion`、キーボードナビ、コントラスト比をチェック

## 9. 確定していない項目 / 実装時に確定するもの

- 問い合わせ用メールアドレスの表記（`hello@tsutsumi.jp` は仮。実際のアドレスをユーザーに確認する）
- Featured Work の具体的なコンテンツ（クライアント名、URL、スクリーンショット画像）
- Tech stack chips の最終一覧
- 「受付中」バッジの ON/OFF 制御（将来的に環境変数で切替可能にする余地）

## 10. 非スコープ（今回やらないこと）

- `/blog/[slug]`, `/announcements/[slug]` の詳細ページ
- `/services/mens-esthe/*` 配下のメンエスサービスページ
- 管理画面 / CMS 側の改修
- ダークモード対応（将来的に Mono + Lime をベースに自然に作れる設計にはしておく）
- 多言語対応（英語版サイトなど）
