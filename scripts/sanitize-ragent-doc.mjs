import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const documentPath = resolve(root, 'public/ragent-doc/index.html')

const decodeEntities = value => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&amp;/gi, '&')

const escapeAttribute = value => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

let html = await readFile(documentPath, 'utf8')

// Mermaid emits a style element in every rendered SVG. Moving those rules to
// the document head keeps the same selectors while avoiding HTML/CSS language
// service false positives on the SVG markup that follows each style element.
const svgStyles = []
html = html.replace(/\s*<style id="mermaid-svg-styles">([\s\S]*?)<\/style>\s*/i, (_, css) => {
  svgStyles.push(css.trim())
  return '\n'
})
html = html.replace(/<svg\b[\s\S]*?<\/svg>/gi, svg => svg.replace(/<style>([\s\S]*?)<\/style>/gi, (_, css) => {
  svgStyles.push(css.trim())
  return ''
}))

const uniqueSvgStyles = [...new Set(svgStyles.filter(Boolean))]
if (uniqueSvgStyles.length) {
  const styleBlock = `  <style id="mermaid-svg-styles">\n${uniqueSvgStyles.join('\n')}\n  </style>\n`
  html = html.replace('</head>', `${styleBlock}</head>`)
}

html = html.replace(/<article\b[\s\S]*?<\/article>/gi, article => {
  const openingTagEnd = article.indexOf('>')
  const openingTag = article.slice(0, openingTagEnd + 1)
  const file = openingTag.match(/\bdata-file="([^"]*)"/i)?.[1] ?? ''
  const title = openingTag.match(/\bdata-title="([^"]*)"/i)?.[1] ?? ''
  const searchableBody = article
    .slice(openingTagEnd + 1)
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')

  const searchText = decodeEntities(`${title} ${file} ${searchableBody}`)
    .replace(/\s+/g, ' ')
    .trim()
  const cleanedOpeningTag = openingTag.replace(
    /\sdata-search="[\s\S]*"(?=>)/i,
    ` data-search="${escapeAttribute(searchText)}"`,
  )

  return cleanedOpeningTag + article.slice(openingTagEnd + 1)
})

await writeFile(documentPath, html, 'utf8')
console.log(`Consolidated ${uniqueSvgStyles.length} Mermaid SVG style blocks in ${documentPath}`)
