import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import java from 'highlight.js/lib/languages/java'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import yaml from 'highlight.js/lib/languages/yaml'

/*
 * Only the languages the posts are likely to use are registered. Importing
 * highlight.js/lib/common instead pulls in ~40 grammars and roughly triples the
 * bundle for no benefit — the existing posts use untagged code fences.
 */
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('java', java)
hljs.registerLanguage('json', json)
hljs.registerLanguage('python', python)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('yaml', yaml)
hljs.registerAliases(['js', 'jsx', 'tsx'], { languageName: 'typescript' })
hljs.registerAliases(['sh', 'shell', 'zsh'], { languageName: 'bash' })
hljs.registerAliases(['py'], { languageName: 'python' })
hljs.registerAliases(['yml'], { languageName: 'yaml' })

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}

/**
 * Standalone escaper. Using `md.utils.escapeHtml` inside the `highlight` option
 * would make `md` reference itself during initialization.
 */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => HTML_ESCAPES[char])
}

const md: MarkdownIt = new MarkdownIt({
  html: false, // posts contain no raw HTML, so keep it off as a hardening default
  linkify: true,
  typographer: false,
  breaks: true, // the notes rely on single newlines reading as line breaks
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {
        /* fall through to escaped plain text */
      }
    }
    return escapeHtml(code)
  },
})

export function renderMarkdown(source: string): string {
  return md.render(source)
}
