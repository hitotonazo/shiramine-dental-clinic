# 白峰デンタルクリニック

白峰デンタルクリニック ARGサイトの制作プロジェクトです。

## SCSSの編集・ビルド

CSSの正本は `scss/` です。生成物である `assets/css/style.css` は直接編集しません。

- 編集対象: `scss/style.scss` と、そこから読み込む `scss/foundation/`、`scss/layout/`、`scss/component/`、`scss/page/`、`scss/utility/`
- CSS出力先: `assets/css/style.css`
- 初回準備: `npm install`
- 一度だけビルド: `npm run build`
- SCSSの変更を監視: `npm run watch`

`npm run watch` 実行中は、SCSSを保存すると `assets/css/style.css` が自動更新されます。

## 共通レイアウト

通常サイトのHeader/Footerは `assets/js/common-layout.js` が `data-site-header` と `data-site-footer` に挿入します。各通常ページではこの2つのプレースホルダーと `assets/css/style.css`、同スクリプトを読み込んでください。

ARG用のサイト改変演出とデバッグモードは、既存の `modules/site-alteration/` を後工程で使用します。STEP 1では通常サイトへ読み込んでいません。
