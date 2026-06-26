# Vrai HP 更新ガイド

このガイドを読めば、Claudeに「何をどう頼めばいいか」がすべてわかります。

---

## ファイル構成

```
HP/
├── index.html          ← トップページ
├── blog.html           ← ブログ（4タブ）
├── contact.html        ← お問い合わせ
├── assets/
│   ├── css/style.css   ← デザイン全体
│   └── js/
│       ├── main.js         ← ナビ・アニメーション
│       ├── blog-data.js    ← ブログ記事データ ★更新頻度高
│       └── sns-data.js     ← SNS投稿データ   ★更新頻度高
├── blog/posts/
│   ├── _template.html  ← 記事テンプレート
│   └── (各記事HTMLファイル)
└── HP_UPDATE_GUIDE.md  ← このファイル
```

---

## よく使う更新依頼の例文

### ブログ記事を追加したい

```
「AIエージェントについて記事を書いて。
 タイトル案も考えて、blog-data.js にも追加して。」
```

→ Claudeが行うこと:
1. リサーチ・執筆
2. `blog/posts/ai-XXX.html` を作成
3. `blog-data.js` に記事データを追加

---

### SNSの投稿をHPに反映したい

```
「今日のInstagram投稿をSNSセクションに追加して。
 内容：〇〇〇〇〇（投稿テキストを貼り付け）
 URL：https://www.instagram.com/p/XXXXXX/」
```

→ Claudeが行うこと:
- `sns-data.js` に投稿データを追加

---

### プロフィール写真を変更したい

```
「プロフィール写真を差し替えたい。
 画像ファイルを assets/images/profile.jpg に保存したので、
 index.html に反映して。」
```

---

### ヒーローに動画を追加したい

```
「ヒーローセクションに動画を追加して。
 ファイル: assets/video/hero.mp4」
```

---

### サービス内容を変更したい

```
「サービスの説明文を変更したい。
 認知科学コーチングの説明を以下に変えて：
 〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇」
```

---

### デザイン・色を変えたい

```
「メインカラーを紫から〇〇に変えて。」
「ヒーローのキャッチコピーを〇〇に変えて。」
```

---

## ブログ記事データの形式（参考）

`assets/js/blog-data.js` の `BLOG_POSTS` 配列にオブジェクトを追加するだけで記事が増えます。

```javascript
{
  id: "mama-002",          // 一意なID（カテゴリ-番号）
  category: "mama",        // mama / coaching / ai / subsidy
  title: "記事タイトル",
  date: "2026-07-01",      // YYYY-MM-DD 形式
  excerpt: "記事の要約文（カード表示に使われます）",
  emoji: "👶",             // サムネイルに表示される絵文字
  url: "/blog/posts/mama-002.html"
}
```

---

## SNS投稿データの形式（参考）

`assets/js/sns-data.js` の `SNS_POSTS` 配列に追加します。

```javascript
{
  id: "ig-003",
  platform: "Instagram",   // Instagram / Facebook / LINE
  emoji: "📸",
  date: "2026-07-01",
  text: "投稿本文をそのままコピー＆ペーストしてください",
  url: "https://www.instagram.com/p/XXXXXX/"
}
```

---

## 初期設定（一度だけ必要）

### 1. フォームの設定
1. [Formspree](https://formspree.io/) に無料登録
2. 「New Form」→ 「Email」に `sakamako.03@gmail.com` を設定
3. 発行されたフォームIDをコピー
4. `contact.html` の以下の部分を変更:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   → `YOUR_FORM_ID` を発行されたIDに置き換え

### 2. SNSリンクの設定
`index.html` の以下の部分を実際のURLに変更:
```html
<a href="https://www.instagram.com/" ...>
<a href="https://www.facebook.com/" ...>
```

### 3. GitHub + Vercel 公開設定
1. GitHubで新しいリポジトリを作成（例: `vrai-hp`）
2. この `HP/` フォルダの中身をリポジトリにアップロード
3. [Vercel](https://vercel.com/) にGitHubログインして「New Project」
4. リポジトリを選択 → 自動でデプロイ完了
5. 以降は GitHub に保存するたびに自動でサイトが更新される

---

## ローカルでプレビューする方法

ターミナルで以下を実行:
```bash
cd "エンジニア部/02_成果物/HP"
npx serve .
# または
python3 -m http.server 3000
```
→ ブラウザで `http://localhost:3000` を開く
