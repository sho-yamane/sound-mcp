# Cursor Sound MCP

Cursor エージェントのコーディングタスクや MCP 呼び出しの完了時にシステムサウンドを再生するための MCP（Model Context Protocol）サーバー。

## 概要

このプロジェクトは、Cursor エージェントがタスクや MCP 呼び出しを完了したときに音を再生するためのシンプルな MCP サーバーを提供します。macOS のシステムサウンドを使用して、AI アシスタントの作業完了を聴覚的に通知します。

## 機能

- 複数の macOS システムサウンドから選択可能
- AI 完了通知のためのシンプルなインターフェース
- Model Context Protocol (MCP) に準拠

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/sho-yamane/sound-mcp.git
cd sound-mcp

# 依存関係をインストール
pnpm install

# ビルド
pnpm run build
```

## 使用方法

### サーバーの起動

```bash
pnpm start
```

### Cursor での使用

Cursor のルール設定に以下の MCP 呼び出しを追加してください。エージェントがコーディングを完了したときにサウンドが再生されます。

```json
{
  "allowedMcpEndpoints": [
    {
      "name": "playCompletionSound",
      "description": "タスク完了時にサウンドを再生します"
    }
  ]
}
```

## 利用可能なサウンド

以下の macOS システムサウンドが利用可能です：

- `GLASS` (デフォルト): ガラスのサウンド
- `PING`: ピンという通知音
- `FUNK`: ファンクサウンド
- `POP`: ポップサウンド
- `PURR`: 猫のような音
- `SOSUMI`: メロディックな通知音
- `SUBMARINE`: 潜水艦のような音
- `TINK`: 金属をたたくような音

## MCP ツール

### playCompletionSound

選択したシステムサウンドを再生します。

**パラメータ**:

- `sound` (オプション): 再生するサウンドの名前。デフォルトは `GLASS`

**例**:

```javascript
callTool({
  name: "playCompletionSound",
  arguments: {
    sound: "PING",
  },
});
```

## ライセンス

MIT

## 貢献

問題や提案があれば、GitHub の Issues または Pull Requests でお知らせください。
