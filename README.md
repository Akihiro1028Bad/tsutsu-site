# 堤　暁寛 - 個人事業主ホームページ

Webサイト制作、アプリ開発、システム開発支援、未経験エンジニアの学習キャリア支援を行っている個人事業主のホームページです。

## 技術スタック

- **Next.js 14** - React フレームワーク
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

Vercel、Netlify、その他のホスティングサービスに簡単にデプロイできます。

### Vercel へのデプロイ

```bash
npm i -g vercel
vercel
```

## ライセンス

このプロジェクトは個人事業主のホームページとして使用されています。

