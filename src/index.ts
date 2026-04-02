/**
 * DiceBear MCP — wraps DiceBear Avatar API v7 (free, no auth)
 *
 * Tools:
 * - generate_avatar: Generate an avatar SVG URL for a given style and seed
 * - list_styles: Return the list of available avatar styles
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.dicebear.com/7.x';

const STYLES = [
  'adventurer',
  'avataaars',
  'bottts',
  'fun-emoji',
  'identicon',
  'initials',
  'lorelei',
  'micah',
  'miniavs',
  'notionists',
  'open-peeps',
  'personas',
  'pixel-art',
  'thumbs',
] as const;

type Style = (typeof STYLES)[number];

const tools: McpToolExport['tools'] = [
  {
    name: 'generate_avatar',
    description:
      'Generate a DiceBear avatar SVG URL for a given style and seed string. Returns the URL that renders the avatar inline.',
    inputSchema: {
      type: 'object',
      properties: {
        style: {
          type: 'string',
          description:
            'The avatar style to use. Available styles: adventurer, avataaars, bottts, fun-emoji, identicon, initials, lorelei, micah, miniavs, notionists, open-peeps, personas, pixel-art, thumbs.',
        },
        seed: {
          type: 'string',
          description:
            'A seed string that determines the avatar appearance. Same seed + style always produces the same avatar.',
        },
      },
      required: ['style', 'seed'],
    },
  },
  {
    name: 'list_styles',
    description: 'List all available DiceBear avatar styles.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'generate_avatar':
      return generateAvatar(args.style as string, args.seed as string);
    case 'list_styles':
      return listStyles();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function generateAvatar(style: string, seed: string) {
  if (!STYLES.includes(style as Style)) {
    throw new Error(
      `Unknown style: "${style}". Available styles: ${STYLES.join(', ')}`
    );
  }
  const url = `${BASE_URL}/${encodeURIComponent(style)}/svg?seed=${encodeURIComponent(seed)}`;
  return {
    style,
    seed,
    url,
    format: 'svg',
  };
}

function listStyles() {
  return {
    count: STYLES.length,
    styles: [...STYLES],
  };
}

export default { tools, callTool } satisfies McpToolExport;
