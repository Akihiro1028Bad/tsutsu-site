# 堤　暁寛 - 個人事業主ホームページ

Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページです

## 技術スタック

- **Next.js 16** - React フレームワーク（Cache Components対応）
- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストのCSS
- **Framer Motion** - アニメーションライブラリ
- **Lucide React** - アイコンライブラリ

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
.
├── app/
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx       # ホームページ
│   └── globals.css     # グローバルスタイル
├── components/
│   ├── Header.tsx      # ヘッダーコンポーネント
│   ├── Hero.tsx        # ヒーローセクション
│   ├── Services.tsx    # サービス紹介
│   ├── About.tsx       # プロフィール
│   ├── Contact.tsx     # お問い合わせ
│   └── Footer.tsx      # フッター
└── package.json
```

## カスタマイズ

### 色の変更

`tailwind.config.js` の `colors` セクションでカラーパレットを変更できます。

### コンテンツの編集

各コンポーネントファイル（`components/` ディレクトリ内）を編集して、コンテンツを変更できます。

## デプロイ

### Vercel へのデプロイ

このプロジェクトはVercelにデプロイできる状態になっています。

#### 方法1: Vercel CLIを使用

```bash
# Vercel CLIをインストール（初回のみ）
npm i -g vercel

# デプロイ
vercel
```

#### 方法2: Vercelダッシュボードを使用（推奨）

1. [Vercel](https://vercel.com)にアクセスしてアカウントを作成/ログイン
2. 「New Project」をクリック
3. GitHubリポジトリをインポート（またはGitリポジトリを接続）
4. プロジェクト設定：
   - **Framework Preset**: Next.js（自動検出されます）
   - **Build Command**: `npm run build`（自動設定されます）
   - **Output Directory**: `.next`（自動設定されます）
5. 環境変数を設定（オプション）：
   - `NEXT_PUBLIC_SITE_URL`: デプロイ後のURL（例: `https://your-project.vercel.app`）
6. 「Deploy」をクリック

#### 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定できます：

- `NEXT_PUBLIC_SITE_URL`: サイトのURL（メタデータで使用）

設定方法：
1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Environment Variables」に移動
3. 変数を追加

#### 自動デプロイ

GitHubリポジトリと連携している場合、`main`ブランチへのプッシュで自動的にデプロイされます。

## ライセンス

このプロジェクトは個人事業主のホームページとして使用されています。

