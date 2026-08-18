# health-tracker-front

## 概要
[health-tracker](https://github.com/sakuma-s/health-tracker)のフロントエンド機能（メモキーワードのリアルタイム検索）を担当するReact + TypeScriptプロジェクトです。
health-tracker本体はThymeleafで動作しますが、リアルタイム検索機能のみ、このプロジェクトでビルドしたJS/CSSを組み込んでいます。

## 仕様技術
| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 19, TypeScript |
| ビルドツール | Vite |
| Lint | ESLint |

## 機能
- メモキーワードのリアルタイム検索

## デプロイ方法
`deploy.ps1`を実行すると、以下が自動で行われます。
1. `npm run build`でビルド
2. health-tracker側の静的ファイルを削除・コピー
3. health-tracker側のlist.htmlのJS/CSSファイル名を最新のものに書き換え

### なぜdeploy.ps1を作ったか
Viteでビルドすると、キャッシュ対策のためファイル名にハッシュが自動付与され、
ビルドのたびにファイル名が変わります。手作業でのコピー・書き換えは
手順漏れのリスクがあり、繰り返しの作業に時間を取られていました。
実装や設計を考える時間を確保するため、デプロイ作業をスクリプト化しました。

## 開発環境の構築
```bash
npm install
npm run dev
```