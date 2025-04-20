import * as fs from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import player from "play-sound";
import { z } from "zod";

// プレイヤーインスタンスを作成
const audioPlayer = player();

// macOSのシステムサウンド
const SYSTEM_SOUNDS = {
  GLASS: "/System/Library/Sounds/Glass.aiff",
  PING: "/System/Library/Sounds/Ping.aiff",
  FUNK: "/System/Library/Sounds/Funk.aiff",
  POP: "/System/Library/Sounds/Pop.aiff",
  PURR: "/System/Library/Sounds/Purr.aiff",
  SOSUMI: "/System/Library/Sounds/Sosumi.aiff",
  SUBMARINE: "/System/Library/Sounds/Submarine.aiff",
  TINK: "/System/Library/Sounds/Tink.aiff",
};

// MCP サーバーを作成
const server = new McpServer({
  name: "CursorSoundMCP",
  version: "1.0.0",
  description:
    "Cursorエージェントがコーディングを終了したときに通知音を鳴らすMCP",
});

// 効果音を再生するツール
server.tool(
  "sound_notification_mcp",
  {
    sound: z
      .enum([
        "GLASS",
        "PING",
        "FUNK",
        "POP",
        "PURR",
        "SOSUMI",
        "SUBMARINE",
        "TINK",
      ])
      .default("GLASS"),
  },
  async ({ sound }) => {
    try {
      // 選択されたシステムサウンドのパスを取得
      const soundPath = SYSTEM_SOUNDS[sound];

      // ファイルの存在チェック
      if (!fs.existsSync(soundPath)) {
        console.error(`Sound file not found: ${soundPath}`);
        return {
          content: [
            {
              type: "text",
              text: `Sound file not found: ${soundPath}`,
            },
          ],
          isError: true,
        };
      }

      // 音を再生
      audioPlayer.play(soundPath, (err: Error | null) => {
        if (err) {
          console.error(`Error playing sound: ${err}`);
        }
      });

      return {
        content: [
          {
            type: "text",
            text: `Successfully played sound: ${sound}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error playing sound: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
        isError: true,
      };
    }
  }
);

// MCP サーバーを起動
const transport = new StdioServerTransport();
console.log("Cursor Sound MCP server started...");

// サーバーを接続
await server.connect(transport);
