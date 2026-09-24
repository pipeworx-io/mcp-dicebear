interface McpToolDefinition {
  name: string;
  description: string;
  /** Human-facing one-liner (fleet #1967). Optional; consumers fall back to
   *  description. Kept in step with shared/src/types.ts — scripts/lib/
   *  check-inlined-types.mjs reports drift at publish time. */
  summary?: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    anyOf?: Array<{ required: string[] }>;
    oneOf?: Array<{ required: string[] }>;
    allOf?: Array<{ required: string[] }>;
  };
  outputSchema?: Record<string, unknown>;
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * DiceBear MCP — wraps DiceBear Avatar API v7 (free, no auth)
 *
 * Tools:
 * - generate_avatar: Generate an avatar SVG URL for a given style and seed
 * - list_styles: Return the list of available avatar styles
 */


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
      'Generate a custom avatar SVG. Specify a style (e.g., \'avataaars\', \'pixel-art\', \'lorelei\') and seed (e.g., username). Returns the SVG URL ready to display.',
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
    description: 'List all available avatar styles. Returns style names and descriptions—use with generate_avatar to pick a style.',
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

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
