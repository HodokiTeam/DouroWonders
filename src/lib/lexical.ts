/**
 * Minimal Markdown-ish → Lexical JSON converter, used by the content seeds.
 * Supports: "## Heading", "### Subheading", "- bullet", "> quote", plain
 * paragraphs, and **bold** inside any of them.
 */

/** Shape Payload's rich-text field expects for each node. */
type LexNode = { [k: string]: unknown; type: string; version: number }

const BOLD = 1

const textRun = (text: string, format = 0): LexNode => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

/** Splits "a **b** c" into text runs, marking the bold ones. */
const inline = (raw: string): LexNode[] => {
  const out: LexNode[] = []
  for (const part of raw.split(/(\*\*[^*]+\*\*)/g)) {
    if (!part) continue
    if (part.startsWith('**') && part.endsWith('**')) out.push(textRun(part.slice(2, -2), BOLD))
    else out.push(textRun(part))
  }
  return out.length ? out : [textRun(raw)]
}

const block = (type: string, children: LexNode[], extra: Record<string, unknown> = {}): LexNode => ({
  type,
  children,
  direction: 'ltr' as const,
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

const paragraph = (text: string) => block('paragraph', inline(text), { textFormat: 0, textStyle: '' })
const heading = (text: string, tag: 'h2' | 'h3') => block('heading', inline(text), { tag })
const quote = (text: string) => block('quote', inline(text))
const bulletList = (items: string[]) =>
  block(
    'list',
    items.map((item, i) => block('listitem', inline(item), { value: i + 1 })),
    { listType: 'bullet', start: 1, tag: 'ul' },
  )

/** Converts a markdown-ish string into the Lexical document Payload stores. */
export function md(source: string) {
  const children: LexNode[] = []
  let bullets: string[] = []

  const flush = () => {
    if (bullets.length) {
      children.push(bulletList(bullets))
      bullets = []
    }
  }

  for (const rawLine of source.trim().split('\n')) {
    const line = rawLine.trim()
    if (!line) {
      flush()
      continue
    }
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2))
      continue
    }
    flush()
    if (line.startsWith('### ')) children.push(heading(line.slice(4), 'h3'))
    else if (line.startsWith('## ')) children.push(heading(line.slice(3), 'h2'))
    else if (line.startsWith('> ')) children.push(quote(line.slice(2)))
    else children.push(paragraph(line))
  }
  flush()

  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/** Rough reading time from the raw source text. */
export const readingMinutes = (source: string) =>
  Math.max(1, Math.round(source.trim().split(/\s+/).length / 200))
