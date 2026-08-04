# mcp-dicebear

DiceBear MCP — wraps DiceBear Avatar API v7 (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `generate_avatar` | Generate a custom avatar SVG. Specify a style (e.g., 'avataaars', 'pixel-art', 'lorelei') and seed (e.g., username). Returns the SVG URL ready to display. |
| `list_styles` | List all available avatar styles. Returns style names and descriptions—use with generate_avatar to pick a style. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "dicebear": {
      "url": "https://gateway.pipeworx.io/dicebear/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Dicebear data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
