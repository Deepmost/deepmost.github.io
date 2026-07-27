export interface Post {
  slug: string
  title: string
  date: Date
  dateText: string
  tags: string[]
  body: string
  excerpt: string
  readingMinutes: number
}

// Markdown files are inlined at build time, so the site stays fully static.
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true })

/**
 * Minimal YAML frontmatter reader. The posts only ever use `title`, `date` and a
 * `tags` list, so a full YAML parser would be dead weight here.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, unknown> = {}
  const tags: string[] = []
  let currentKey = ''

  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.match(/^\s*-\s+(.*)$/)
    if (listItem) {
      if (currentKey === 'tags') tags.push(stripQuotes(listItem[1].trim()))
      continue
    }

    const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!pair) continue

    currentKey = pair[1]
    const value = pair[2].trim()
    if (value) data[currentKey] = stripQuotes(value)
  }

  if (tags.length) data.tags = tags
  return { data, body: match[2] }
}

function stripQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, '')
}

/** Hexo writes `2026-05-14 14:58:32`, which Safari refuses to parse directly. */
function parseDate(value: unknown): Date {
  if (typeof value !== 'string') return new Date(0)
  const parsed = new Date(value.trim().replace(' ', 'T'))
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed
}

function formatDate(date: Date): string {
  if (date.getTime() === 0) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Strips markdown syntax so list cards can show a clean text teaser. */
function toExcerpt(body: string, limit = 90): string {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*[>#\-*+]+\s*/gm, '')
    .replace(/[*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > limit ? `${text.slice(0, limit)}…` : text
}

/** CJK reads at a different rate than English; count characters, not words. */
function readingMinutes(body: string): number {
  const cjk = (body.match(/[一-龥]/g) || []).length
  const words = (body.match(/[A-Za-z0-9]+/g) || []).length
  return Math.max(1, Math.round(cjk / 400 + words / 200))
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw as string)
    const slug = decodeURIComponent(path.replace(/^\.\/posts\//, '').replace(/\.md$/, ''))
    const date = parseDate(data.date)

    return {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date,
      dateText: formatDate(date),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      body,
      excerpt: toExcerpt(body),
      readingMinutes: readingMinutes(body),
    }
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime())

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export const allTags: { name: string; count: number }[] = Object.entries(
  posts.reduce<Record<string, number>>((acc, post) => {
    for (const tag of post.tags) acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {})
).map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
