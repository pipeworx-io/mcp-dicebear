# mcp-dicebear

MCP server for generating avatars via [DiceBear API](https://www.dicebear.com). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `generate_avatar` | Generate a DiceBear avatar SVG URL for a given style and seed |
| `list_styles` | List all available DiceBear avatar styles |

## Quickstart via Pipeworx Gateway

Call any tool through the hosted gateway with zero setup:

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "dicebear_generate_avatar",
      "arguments": { "style": "bottts", "seed": "hello" }
    }
  }'
```

## License

MIT
