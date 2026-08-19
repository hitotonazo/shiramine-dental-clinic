# 白峰デンタルクリニック ARGサイト

## 00｜全体仕様・CodeX実装ルール

### 1. 目的

一見すると実在しそうな地域密着型歯科医院から始まり、異常を一本道で調査して「SHIRAMINE
PROJECT」へ到達する常設型ARG。想定プレイ時間20〜60分。

進行：通常サイト → PHASE1 保存対象 → PHASE2 保存歯管理記録 → PHASE3
白峰町生活行動記録 → TRUTH → ENDING → TOP最終変化。

原則： - 初期状態はARGに見えない普通の歯科医院。 -
各段階の新しい重要操作は原則1箇所。 - 直前の発見が次の操作理由になる。 -
文章だけでなく画像・数値・地図・画面変化で体験させる。 -
真相は全伏線をSHIRAMINE PROJECTへ回収する。

### 2. 確定ページ

-   `index.html`：通常TOP／Ending後の変化
-   `column-tooth.html`：PHASE1
-   `records.html`：PHASE2〜3
-   `truth.html`：真相・Ending・X共有

ページを追加して細分化しない。PHASE2〜3は原則records.html内の状態変化。

### 3. デザイン

`参考01.jpg` `参考02.jpg`
は雰囲気・色味・写真トーンのみ参考。レイアウト模倣禁止。

通常サイト：白〜アイボリー、淡いベージュ／ピンク、木目、明るい自然光、清潔・柔らかい・安心感。
Grid/Flex中心で崩れにくくする。PC 2〜3カラム、SPは自然に1カラム。
複雑な重なり、極端な余白、縦書き多用、ARGを匂わせる黒赤グリッチは禁止。

本文15〜16px、最小14px。

### 4. ボタン

Primary / Secondary / System の最大3系統。
色やアイコンは用途で変更可。ただし高さ、角丸、padding、font-size、font-weight、基本形状は共通化。a/buttonで別デザインにしない。

### 5. SCSS

SCSSを正とし、生成済み`style.css`を直接編集しない。

推奨： `scss/foundation/` `scss/layout/` `scss/component/` `scss/page/`
`scss/utility/` `scss/style.scss`

出力：`assets/css/style.css`

package.json： - `npm run build` - `npm run watch`

READMEに編集対象SCSS、コマンド、CSS出力先を明記。watch中はSCSS保存後にCSSへ自動反映。

### 6. modules

既存実装として踏襲するのは`modules`のみ。
サイト改変演出とデバッグモードはmodulesの既存実装を必ず使用し、類似機能を新規実装しない。
最初にmodulesの仕様/API/表示タイミングを調査する。変更が必要なら勝手に改変せず、理由と影響範囲を報告して停止。

サイト改変演出は「異常を初めて発見しPHASEが進んだ時」に原則1回のみ。
発見済み箇所の2回目以降クリックでは再生しない。

### 7. 状態管理

localStorage推奨： `shiraminePhase` `shiramineFoundPhase1`
`shiramineFoundRecords` `shiramineLifeRecordOpened`
`shiramineOtherSubjectsViewed` `shiramineAllResidentsViewed`
`shiramineOldestRecordViewed` `shiramineTruthViewed` `shiramineEnding`

phase：`phase0 / phase1 / phase2 / phase3 / truth / ending`
不正値はphase0へ。更新・遷移・ブラウザバック後も発見済み状態を維持。

### 8. 画像

正式情報はHTMLテキスト。AI画像内の文字を正式データとして使わない。

使用予定： `clinic-logo.png`, `clinic-hero.jpg`, `clinic-reception.jpg`,
`director.jpg`, `treatment-general.jpg`, `treatment-child.jpg`,
`treatment-whitening.jpg`, `column-extraction.jpg`,
`specimen-sh018.jpg`, `specimen-sh026.jpg`, `specimen-sh033.jpg`,
`specimen-sh041.jpg`, `specimen-sh052.jpg`, `shiramine-map.jpg`,
`truth-tissue.jpg`, `truth-shiramine-archive.jpg`

`shiramine-map.jpg`は背景のみ。施設名・現在地・住民点はHTML/CSS/JSで重ねる。

### 9. CodeX実装手順

一括実装禁止。各STEP完了後に停止・報告。

STEP1：共通基盤、SCSS、Header/Footer、container、button、typography、responsive、modules調査。
STEP2：index.html、column-tooth.html通常部分。PC/SP完成。
STEP3：PHASE1、records.html PHASE2〜3 UI。
STEP4：truth.html、Ending、X共有。
STEP5：localStorage、PHASE、発見済みフラグ、modules改変演出/debug、直接アクセス、resetを統合。

### 10. 禁止

仕様外ページ・謎・暗号・ストーリー変更、modules再実装、発見済み異常の演出再生、参考サイトのレイアウトコピー、横スクロール前提SP、style.css直接編集は禁止。
不明点は推測せず報告して停止。
