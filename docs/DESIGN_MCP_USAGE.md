# Next.js DevTools MCP デザイン面での活用方法

Next.js DevTools MCPを活用して、デザインの品質を向上させる具体的な方法を説明します。

## 🎨 主な活用方法

### 1. **リアルタイムデザイン検証**

#### デザイン検証ツール（DesignInspector）
開発環境で `Ctrl+Shift+D` を押すと、リアルタイムでデザインメトリクスを確認できます。

**確認できる情報:**
- ビューポートサイズ
- カラーパレット（Primary/Accent）
- タイポグラフィ（フォント、サイズ、行間）
- 画像最適化状況
- セクションの表示状態

#### 使用方法
```typescript
// ページに自動的に追加されています
// 開発環境でのみ表示されます
<DesignInspector />
```

### 2. **画像最適化の検証と修正**

#### 問題の検出
ブラウザのコンソールで以下の警告を検出：
- `Image with src "/logo.png" has either width or height modified`
- `Image was detected as the Largest Contentful Paint (LCP)`

#### 修正方法
```tsx
<Image
  src="/logo.png"
  alt="tsutsu"
  width={240}
  height={96}
  priority  // LCP画像には必須
  sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
/>
```

### 3. **レスポンシブデザインの検証**

#### Next.js DevTools MCPで確認
```typescript
// ページメタデータから構成を確認
const metadata = await get_page_metadata()
// → どのコンポーネントが使用されているか確認

// エラーがないか確認
const errors = await get_errors()
// → レスポンシブ関連のエラーを検出
```

#### ブラウザ自動化で検証
```typescript
// 異なるビューポートサイズでテスト
await browser.setViewportSize({ width: 375, height: 667 })  // iPhone
await browser.setViewportSize({ width: 768, height: 1024 }) // iPad
await browser.setViewportSize({ width: 1920, height: 1080 }) // Desktop
```

### 4. **カラーパレットとタイポグラフィの一貫性チェック**

#### カラーパレットの検証
```typescript
// tailwind.config.jsで定義されたカラーを確認
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-600')
```

#### タイポグラフィの検証
```typescript
// フォント設定を確認
const fontFamily = getComputedStyle(document.body).fontFamily
const fontSize = getComputedStyle(document.body).fontSize
const lineHeight = getComputedStyle(document.body).lineHeight
```

### 5. **パフォーマンスとデザインの関係**

#### LCP（Largest Contentful Paint）の最適化
- Heroセクションの画像に `priority` 属性を追加
- 適切な `sizes` 属性でレスポンシブ画像を最適化

#### 画像の遅延読み込み
- フォールド以下の画像には `loading="lazy"` を設定
- 重要な画像には `priority` を設定

### 6. **デザインシステムの一貫性**

#### コンポーネントの検証
```typescript
// すべてのセクションが適切に構成されているか確認
const sections = document.querySelectorAll('section')
sections.forEach(section => {
  // セクションの高さ、表示状態などを検証
})
```

#### スペーシングの一貫性
- Tailwindのユーティリティクラスを使用
- コンテナの最大幅を統一
- セクション間のスペーシングを統一

## 🔧 実装例

### デザイン検証ツールの使用

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **ブラウザでページを開く**
   - http://localhost:3000

3. **デザイン検証ツールを表示**
   - `Ctrl+Shift+D` を押す
   - 右下にデザイン検証パネルが表示されます

4. **メトリクスを確認**
   - ビューポートサイズ
   - カラーパレット
   - タイポグラフィ
   - 画像最適化状況

### Next.js DevTools MCPとの連携

```typescript
// エラーを検出
const errors = await get_errors()
if (errors.includes('Image')) {
  // 画像関連のエラーを修正
}

// ページ構成を確認
const metadata = await get_page_metadata()
// → 使用されているコンポーネントを確認

// ログを確認
const logs = await get_logs()
// → デザイン関連の警告を確認
```

## 📊 検証チェックリスト

### 画像最適化
- [ ] すべての画像に `width` と `height` 属性が設定されている
- [ ] LCP画像に `priority` 属性が設定されている
- [ ] レスポンシブ画像に適切な `sizes` 属性が設定されている

### レスポンシブデザイン
- [ ] モバイル（375px）で適切に表示される
- [ ] タブレット（768px）で適切に表示される
- [ ] デスクトップ（1920px）で適切に表示される

### カラーとタイポグラフィ
- [ ] カラーパレットが一貫している
- [ ] フォントファミリーが適切に設定されている
- [ ] テキストのコントラスト比がWCAG基準を満たしている

### パフォーマンス
- [ ] LCP画像が最適化されている
- [ ] 不要な画像の遅延読み込みが設定されている
- [ ] アニメーションがパフォーマンスに影響していない

## 🚀 次のステップ

1. **デザインシステムの拡張**
   - カラーパレットの追加
   - タイポグラフィスケールの定義
   - スペーシングシステムの統一

2. **自動化テスト**
   - ビジュアルリグレッションテスト
   - レスポンシブデザインの自動検証
   - アクセシビリティテスト

3. **パフォーマンス最適化**
   - 画像の最適化
   - フォントの最適化
   - CSSの最適化

## 📚 参考資料

- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

