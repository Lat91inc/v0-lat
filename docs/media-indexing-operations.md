# メディアのインデックス監視

## 自動チェック

GitHub Actions の `Media indexing health` は毎日 08:17 JST と Vercel Production デプロイ成功時に公開サイトを検査します。手動実行もできます。CMS キーは使いません。GitHub の scheduled workflow は遅延・休止する場合があるため、Actions の実行履歴も定期的に確認してください。

- 公開 API の総記事数とサイトマップの記事数が一致すること
- 一覧の通常リンクをたどり、全記事に重複なく到達できること
- 最新記事がサイトマップ・トップの初期 HTML に含まれること
- 一覧・最新記事が HTTP 200、正しい canonical、noindex なしであること

記事公開直後の ISR 更新差を考慮して、失敗時は75秒間隔で最大3回検査します。継続して失敗すると workflow が失敗し、30日間ログが残ります。GitHub の失敗通知は各担当者の Actions 通知設定に従います。

手元での実行: `python3 scripts/check-media-indexing.py --attempts 1`

## 失敗したとき

1. Actions ログで CMS 総数、サイトマップ数、一覧到達数のどこが違うか確認。
2. CMS 障害・公開直後の変化・デプロイ不備を切り分け、再実行。
3. 一覧・sitemap の取得上限、ページ送り、revalidate を確認。CMS の一時エラーを404に変換しない。
4. 修正後に自動検査を通し、Search Console のサイトマップ取得状況と代表 URL の検査を確認。

## Google 側の確認（週1回）

この監視は Google の登録数や順位を取得しません。Search Console で `/media/` のクリック・表示回数、記事の登録数、クロール済み未登録数を確認します。未登録に画像などが含まれるため、記事 URL だけを分けて比較します。サイトマップ送信は登録や順位上昇を保証しません。

本番変更時は build と `outputs/2026-11-12-indexing/verify_local.py` 相当のページ送り・不正URL・記事検査を実行してください。初回復旧の検証証跡はローカル outputs に保存されています。
