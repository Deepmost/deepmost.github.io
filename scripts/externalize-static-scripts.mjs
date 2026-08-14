import { access, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pages = [
  {
    documentPath: resolve(root, 'public/codetop-top200/codetop_top200.html'),
    scriptNames: ['theme-init.js', 'mathjax-config.js', 'app.js'],
  },
  {
    documentPath: resolve(root, 'public/ragent-doc/index.html'),
    scriptNames: ['app.js'],
  },
]

const inlineScriptPattern = /<script\s*>([\s\S]*?)<\/script>/gi

for (const { documentPath, scriptNames } of pages) {
  const html = await readFile(documentPath, 'utf8')
  const inlineScripts = [...html.matchAll(inlineScriptPattern)]

  if (inlineScripts.length === 0) {
    await Promise.all(scriptNames.map(name => access(resolve(dirname(documentPath), name))))
    console.log(`Static scripts already externalized in ${documentPath}`)
    continue
  }

  if (inlineScripts.length !== scriptNames.length) {
    throw new Error(
      `Expected ${scriptNames.length} inline scripts in ${documentPath}, found ${inlineScripts.length}`,
    )
  }

  let scriptIndex = 0
  const externalizedHtml = html.replace(inlineScriptPattern, () => {
    const scriptName = scriptNames[scriptIndex]
    scriptIndex += 1
    return `<script src="./${scriptName}"></script>`
  })

  await Promise.all([
    writeFile(documentPath, externalizedHtml, 'utf8'),
    ...inlineScripts.map((match, index) => {
      const source = match[1].replace(/^\r?\n/, '').replace(/\r?\n\s*$/, '\n')
      return writeFile(resolve(dirname(documentPath), scriptNames[index]), source, 'utf8')
    }),
  ])

  console.log(`Externalized ${inlineScripts.length} scripts in ${documentPath}`)
}
