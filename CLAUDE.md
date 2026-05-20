# task-board

チェックボックスで完了管理できるタスクボードアプリ。React + Vite 構成のフロントエンド完結型 Web アプリ。タスクは localStorage に永続化される。

## 技術スタック

- React 18（状態管理・UI コンポーネント）
- Vite 5（ビルドツール・開発サーバー）
- CSS（フレームワークなし、plain CSS）
- localStorage（タスクの永続化）

## プロジェクト構成

```
task-board/
├── CLAUDE.md
├── index.html                  # Vite エントリポイント
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx                # React ルート
│   ├── App.jsx                 # メインコンポーネント
│   └── App.css                 # スタイル
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Pages 自動デプロイ
```

## コンポーネント命名規約

- **コンポーネント名・ファイル名**: PascalCase（例: `App.jsx`, `TaskItem.jsx`）
- **CSS ファイル**: コンポーネントと同名（例: `App.css`, `TaskItem.css`）
- **カスタムフック**: `use` プレフィックス + camelCase（例: `useLocalStorage.js`）
- **イベントハンドラ**: `handle` プレフィックス + camelCase（例: `handleKeyDown`, `handleDelete`）
- **props**: camelCase（例: `onToggle`, `onDelete`）

## デプロイ先

- URL: https://omonobu-yamashita.github.io/task-board/
- `main` ブランチへの push で GitHub Actions が自動ビルド＆デプロイ

## GitHub リポジトリ

- URL: https://github.com/Tomonobu-Yamashita/quiz-app.git
- リモート名: `origin`
- デフォルトブランチ: `main`

## 業務ルール（グローバル共通）

- ファイルの削除・上書き前には必ず確認を求めること
- フォルダ名・ファイル名の日付は「YYYYMMDD」形式にすること
- 作業が完了したら「Claude_Work/作業ログ/」フォルダに実施内容を追記すること

## Git 運用ルール

- コードを変更するたびに、必ず以下の手順でコミット＆プッシュを行うこと：
  1. `git add` で変更ファイルをステージング
  2. `git commit -m "変更内容の簡潔な説明"` でコミット
  3. `git push origin main` で GitHub にプッシュ
- コミットメッセージは日本語でも英語でも可。変更の「なぜ」を簡潔に記述する
- 破壊的な操作（`--force` push、`reset --hard` 等）は必ずユーザーの確認を取ること
- `main` ブランチへの直接プッシュは実行前に確認を求めること
- `.env` や認証情報を含むファイルは絶対にコミットしないこと

## コーディング規約

- インデントはスペース2文字
- 文字コードは UTF-8
- `var` は使用しない（`const` / `let` を使用）
- コメントは原則不要。WHY が非自明な場合のみ日本語で1行
- セキュリティ上の脆弱性（XSS 等）を導入しないこと
