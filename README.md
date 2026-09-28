# 沖縄アトツギモアイ Webサイト

軽量なHTML/CSS/JavaScriptで構成。利用者にAI契約は不要です。

公開先: https://okinawa-atotsugi-moai.github.io/

## 日々の運用

- 活動レポートは、これまでどおり公式noteに投稿します。公開設定完了後は6時間ごとの処理で最新記事を取り込み、トップに3件表示します。反映には数時間かかることがあります。
- すぐに反映したいときは、GitHubのActions → Publish Moai website → Run workflowを実行します。
- 更新結果はActionsの緑のチェックで確認できます。赤い失敗表示の場合は処理のログを確認してください。
- GitHubの定期処理が長期未更新で停止した場合は、同じActions画面で再度有効にしてください。
- 活動写真はCSSで明るさを調整しています。元画像は変更していません。

## 初稿を見る

Python 3がある場合、リポジトリのルートで `python -m http.server 4173 --directory site/dist --bind 127.0.0.1` を実行し、http://127.0.0.1:4173/ を開きます。インストールなしでは `site/dist/index.html` をブラウザーで開くこともできます。

## イベントの更新

`site/content/event.json` にタイトル・日付・会場・参加費・申込URLを記入します。titleを空欄にすると準備中になります。公開環境ではmainへの変更が公開処理を開始します。日程変更・中止時はstatusと申込URLを必ず見直してください。

## note自動反映

`python site/scripts/sync_note.py` が公式RSSから最新6件を保存し、トップに3件を表示します。本文はnoteへ案内します。取得失敗時は保存済み記事を使用します。新着取得とイベントデータの反映は公開処理時に実行されます。

GitHub Actionsは6時間ごとの取得・公開を設定済みですが、GitHubリポジトリとPagesの設定が終わるまで自動運転は始まりません。RSSに現れる更新が対象で、記事削除や過去記事の修正すべてを即時同期する保証はありません。定期処理は遅延することがあり、公開リポジトリでは60日間活動がないとスケジュールが停止する場合があります。再開はActionsで行ってください。

## GitHub Pagesを開始する

1. 運営用GitHubリポジトリにこのフォルダーの内容を配置し、既定ブランチをmainにします。
2. Settings → Pages → SourceをGitHub Actionsに設定します。
3. Actions → Publish Moai website → Run workflowを実行します。
4. 公開URL、note記事、スマートフォン表示、申込リンクを確認します。

## 共同編集

AIがないメンバーの日常更新は、完成後に共有入力表との連携を整備する予定です（現時点では未実装）。当面はGitHubのブラウザー画面でevent.jsonを編集可能です。

コードを編集する人はGitHubのCode → Download ZIP、またはgit cloneで取得します。AIは任意です。各自のブランチで修正し、Pull Requestで内容を確認してからmainへ統合してください。ZIPを取得する場合も最新版を使い、リポジトリ全体の上書きを避けてください。

## 素材と内容

写真は運営の公式note「第1回イベント開催レポート」の公開写真を使用。原記事: https://note.com/okinawa_atotsugi/n/n5a33d0ae7784 。サイト公開前に運営内で写真使用・協賛表記・参加対象・お問い合わせ先を確認してください。次回イベントの詳細は未提供のため準備中表示です。支援制度は公式案内への入口のみで、募集中の制度や助成額を独自に断定していません。

第2回の写真は運営提供「後継ぎ.jpg」を使用。HEROESから取得した写真2枚はサイトから撤去済み。琉球新報・HEROESのメディア掲載欄は紹介文と外部記事リンクのみ。

About usのコラージュは運営指定Google Driveの写真から選定。第1回: IMG_5446.JPG / IMG_5451.JPG / IMG_5453.JPG、第2回: A.JPG。小さな表示用のWebP素材を使用。
