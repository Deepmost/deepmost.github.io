import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = resolve(root, 'src/content/reports/internship-work-summary.md')
const outputPath = resolve(root, 'public/internship-work-summary/index.html')
const mermaidPath = resolve(root, 'node_modules/mermaid/dist/mermaid.min.js')

const raw = await readFile(sourcePath, 'utf8')
const mermaidSource = await readFile(mermaidPath, 'utf8')
const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
const headings = []
const seen = new Map()

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

function headingId(value) {
  const base = value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-') || 'section'
  const count = seen.get(base) ?? 0
  seen.set(base, count + 1)
  return count === 0 ? base : `${base}-${count + 1}`
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(code) {
    return escapeHtml(code)
  },
})

const defaultHeadingOpen = md.renderer.rules.heading_open
md.renderer.rules.heading_open = (tokens, index, options, env, self) => {
  const inline = tokens[index + 1]
  const text = inline?.content?.replace(/`([^`]+)`/g, '$1').trim() ?? 'section'
  const id = headingId(text)
  const level = Number(tokens[index].tag.slice(1))
  if (level <= 3) headings.push({ id, level, text })
  tokens[index].attrSet('id', id)
  return defaultHeadingOpen ? defaultHeadingOpen(tokens, index, options, env, self) : self.renderToken(tokens, index, options)
}

const html = md.render(body)
const toc = headings
  .filter((heading) => heading.level >= 2)
  .map((heading) => `<a class="toc-link level-${heading.level}" href="#${heading.id}">${escapeHtml(heading.text)}</a>`)
  .join('')

const mermaidScript = mermaidSource.replace(/<\/script/gi, '<\\/script')
const output = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta id="theme-color" name="theme-color" content="#080a09">
  <title>实习工作贡献梳理</title>
  <script>
    (() => {
      try {
        const saved = localStorage.getItem('work-summary-theme');
        document.documentElement.dataset.theme = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      } catch {
        document.documentElement.dataset.theme = 'dark';
      }
    })();
  </script>
  <style>
    :root { color-scheme:dark; --ink:#dedbc8; --muted:#92958c; --faint:#626861; --line:rgba(222,219,200,.12); --paper:#101312; --canvas:#080a09; --sidebar:#0c100e; --surface:#0c100e; --surface-hover:rgba(139,184,168,.07); --teal:#8bb8a8; --link-hover:#c0e0d3; --amber:#d6a65b; --accent-border:rgba(139,184,168,.4); --heading-3:#c5c6b6; --heading-4:#b3b6a8; --strong:#e8e6d6; --quote-border:rgba(214,166,91,.7); --quote-bg:rgba(214,166,91,.07); --quote-text:#b9b3a2; --code-bg:#202623; --code-ink:#c4d4cb; --pre-bg:#090c0b; --pre-ink:#c9d3cd; --table-head-bg:#18201c; --table-head-ink:#c7d5cc; --diagram-border:rgba(139,184,168,.2); --diagram-bg:#0b100e; --error-bg:rgba(214,166,91,.08); --toggle-shadow:0 10px 30px rgba(0,0,0,.25); }
    :root[data-theme="light"] { color-scheme:light; --ink:#25312d; --muted:#64716c; --faint:#89938f; --line:rgba(37,49,45,.14); --paper:#ffffff; --canvas:#f3f5f2; --sidebar:#fbfcfa; --surface:#ffffff; --surface-hover:rgba(21,112,92,.07); --teal:#15705c; --link-hover:#0b4f40; --amber:#a56515; --accent-border:rgba(21,112,92,.35); --heading-3:#34453f; --heading-4:#53625d; --strong:#17231f; --quote-border:rgba(165,101,21,.62); --quote-bg:#fff7e8; --quote-text:#6d573a; --code-bg:#e8efeb; --code-ink:#175b4b; --pre-bg:#17201d; --pre-ink:#ecf2ee; --table-head-bg:#e8f0ec; --table-head-ink:#174f43; --diagram-border:rgba(21,112,92,.22); --diagram-bg:#fbfdfb; --error-bg:#fff7e8; --toggle-shadow:0 10px 30px rgba(37,49,45,.14); }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; color:var(--ink); background:var(--canvas); font:15px/1.85 Inter,"Noto Sans SC","Microsoft YaHei",sans-serif; transition:color .25s ease,background-color .25s ease; }
    a { color:var(--teal); text-underline-offset:3px; }
    a:hover { color:var(--link-hover); }
    .app-shell { min-height:100vh; display:grid; grid-template-columns:280px minmax(0,1fr); }
    .sidebar { position:sticky; top:0; height:100vh; overflow:auto; padding:28px 18px 24px; border-right:1px solid var(--line); background:var(--sidebar); transition:background-color .25s ease,border-color .25s ease; }
    .brand { padding:0 10px 22px; border-bottom:1px solid var(--line); }
    .brand-mark { display:inline-flex; width:30px; height:30px; align-items:center; justify-content:center; margin-right:9px; border:1px solid var(--accent-border); border-radius:6px; color:var(--teal); font:bold 13px ui-monospace,monospace; }
    .brand h1 { display:inline; margin:0; font-size:16px; letter-spacing:.01em; }
    .brand p { margin:9px 0 0; color:var(--faint); font-size:11px; line-height:1.5; }
    .nav-label { margin:25px 10px 8px; color:var(--faint); font:10px ui-monospace,monospace; letter-spacing:.12em; text-transform:uppercase; }
    .doc-nav { display:flex; flex-direction:column; gap:2px; }
    .toc-link { display:block; padding:8px 10px; border-left:1px solid transparent; color:var(--muted); text-decoration:none; font-size:12px; line-height:1.45; }
    .toc-link.level-3 { padding-left:23px; font-size:11px; }
    .toc-link:hover { border-left-color:var(--teal); background:var(--surface-hover); color:var(--ink); }
    .sidebar-foot { margin:22px 10px 0; padding-top:14px; border-top:1px solid var(--line); color:var(--faint); font-size:10px; line-height:1.6; }
    .content-shell { min-width:0; padding:26px clamp(18px,4vw,68px) 70px; }
    main { max-width:1160px; margin:0 auto; }
    .report-head { padding:15px 0 35px; border-bottom:1px solid var(--line); }
    .kicker { color:var(--faint); font:10px ui-monospace,monospace; letter-spacing:.12em; text-transform:uppercase; }
    .report-head h1 { max-width:900px; margin:15px 0 12px; color:var(--ink); font-size:clamp(30px,4vw,58px); line-height:1.18; letter-spacing:-.025em; }
    .lede { max-width:750px; margin:0; color:var(--muted); font-size:15px; }
    .stats { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); max-width:840px; margin-top:26px; border:1px solid var(--line); }
    .stat { padding:14px 16px; border-right:1px solid var(--line); background:var(--surface); transition:background-color .25s ease,border-color .25s ease; }
    .stat:last-child { border-right:0; }
    .stat strong { display:block; color:var(--amber); font:16px ui-monospace,monospace; }
    .stat span { display:block; margin-top:3px; color:var(--faint); font-size:10px; }
    .report-grid { margin-top:36px; }
    .doc { min-width:0; }
    .doc h1 { margin:2.5em 0 .75em; color:var(--ink); font-size:1.85em; line-height:1.3; }
    .doc h2 { margin:3.2em 0 .75em; padding-bottom:.4em; border-bottom:1px solid var(--line); color:var(--ink); font-size:1.5em; line-height:1.3; scroll-margin-top:26px; }
    .doc h3 { margin:2.3em 0 .65em; color:var(--heading-3); font-size:1.2em; line-height:1.4; scroll-margin-top:26px; }
    .doc h4 { margin:1.9em 0 .6em; color:var(--heading-4); font-size:1.05em; line-height:1.45; }
    .doc p, .doc ul, .doc ol, .doc table, .doc blockquote { max-width:950px; }
    .doc strong { color:var(--strong); }
    .doc blockquote { margin:16px 0; padding:9px 15px; border-left:2px solid var(--quote-border); background:var(--quote-bg); color:var(--quote-text); }
    .doc code { padding:2px 5px; border-radius:3px; background:var(--code-bg); color:var(--code-ink); font:12px/1.5 ui-monospace,monospace; overflow-wrap:anywhere; }
    .doc pre { max-width:100%; overflow:auto; margin:18px 0; padding:15px 17px; border:1px solid var(--line); border-radius:6px; background:var(--pre-bg); color:var(--pre-ink); }
    .doc pre code { padding:0; background:none; color:inherit; }
    .doc table { width:100%; margin:18px 0; border-collapse:collapse; font-size:13px; overflow:auto; }
    .doc th, .doc td { padding:8px 10px; border:1px solid var(--line); text-align:left; vertical-align:top; }
    .doc th { background:var(--table-head-bg); color:var(--table-head-ink); white-space:nowrap; }
    .doc img { max-width:100%; height:auto; }
    .doc hr { margin:30px 0; border:0; border-top:1px solid var(--line); }
    .architecture-diagram { width:100%; margin:22px 0 28px; padding:15px; overflow:auto; border:1px solid var(--diagram-border); border-radius:6px; background:var(--diagram-bg); transition:background-color .25s ease,border-color .25s ease; }
    .architecture-diagram .mermaid { min-width:650px; }
    .architecture-diagram svg { display:block; min-width:650px; max-width:100%; height:auto; margin:0 auto; }
    .mermaid-error { margin:14px 0; padding:9px 12px; border-left:2px solid var(--amber); background:var(--error-bg); color:var(--quote-text); font-size:12px; }
    .theme-toggle { position:fixed; z-index:20; top:18px; right:18px; display:inline-flex; align-items:center; gap:7px; min-width:72px; justify-content:center; padding:8px 12px; border:1px solid var(--line); border-radius:999px; color:var(--ink); background:color-mix(in srgb,var(--surface) 92%,transparent); box-shadow:var(--toggle-shadow); backdrop-filter:blur(12px); cursor:pointer; font:12px/1.2 "Microsoft YaHei",sans-serif; transition:transform .2s ease,color .25s ease,background-color .25s ease,border-color .25s ease; }
    .theme-toggle:hover { transform:translateY(-1px); border-color:var(--accent-border); }
    .theme-toggle:focus-visible { outline:2px solid var(--teal); outline-offset:3px; }
    .theme-toggle:disabled { cursor:wait; opacity:.65; transform:none; }
    .theme-toggle-icon { width:16px; font-size:15px; line-height:1; }
    @media (max-width:900px) { .app-shell { grid-template-columns:1fr; } .sidebar { position:relative; height:auto; border-right:0; border-bottom:1px solid var(--line); padding:16px 94px 16px 16px; } .brand { padding-bottom:14px; } .doc-nav { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); } .content-shell { padding:8px 14px 45px; } .report-grid { margin-top:24px; } .toc-link { width:auto; margin-right:5px; padding:5px 8px; border:1px solid var(--line); } .theme-toggle { top:12px; right:12px; } }
    @media (max-width:540px) { .doc-nav { grid-template-columns:1fr; } .stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .stat:nth-child(2) { border-right:0; } .stat:nth-child(-n+2) { border-bottom:1px solid var(--line); } .report-head h1 { font-size:32px; } .doc { font-size:14px; } .architecture-diagram { padding:9px; } }
  </style>
</head>
<body>
  <button class="theme-toggle" id="theme-toggle" type="button"><span class="theme-toggle-icon" aria-hidden="true">☀</span><span class="theme-toggle-label">亮色</span></button>
  <div class="app-shell">
    <aside class="sidebar" aria-label="报告目录">
      <div class="brand"><span class="brand-mark">实</span><h1>实习工作贡献</h1><p>工程复盘报告</p></div>
      <div class="nav-label">Report index</div>
      <nav class="doc-nav">${toc}</nav>
      <div class="sidebar-foot">统计范围：2026-04-09 ~ 2026-08-13<br>141 次提交 · 10 个仓库 · 3 条业务线</div>
    </aside>
    <section class="content-shell">
      <main>
        <header class="report-head">
          <div class="kicker">Internship / Engineering Retrospective</div>
          <h1>实习工作贡献梳理</h1>
          <p class="lede">18 周、3 条业务线、10 个仓库。从 AI 教学业务到学习数据可信，再到站点成本归因的完整工程复盘。</p>
          <div class="stats">
            <div class="stat"><strong>141</strong><span>次提交</span></div>
            <div class="stat"><strong>10</strong><span>个仓库</span></div>
            <div class="stat"><strong>18</strong><span>周跨度</span></div>
            <div class="stat"><strong>2026-08-13</strong><span>最后更新</span></div>
          </div>
        </header>
        <div class="report-grid">
          <article class="doc">${html}</article>
        </div>
      </main>
    </section>
  </div>
  <script>${mermaidScript}</script>
  <script>
    (() => {
      const blocks = [...document.querySelectorAll('pre > code.language-mermaid')];
      const report = document.querySelector('.doc');
      const toggle = document.getElementById('theme-toggle');
      const themeColor = document.getElementById('theme-color');
      const diagrams = blocks.map(code => { const figure = document.createElement('figure'); figure.className = 'architecture-diagram'; figure.setAttribute('aria-label', '架构或数据流程图'); const source = code.textContent || ''; code.parentElement.replaceWith(figure); return { figure, source }; });
      const palettes = {
        dark: { background:'#0b100e', primaryColor:'#18201c', primaryTextColor:'#dedbc8', primaryBorderColor:'#718c7f', secondaryColor:'#111713', tertiaryColor:'#202922', lineColor:'#94a79b', textColor:'#dedbc8', mainBkg:'#18201c', nodeBorder:'#718c7f', clusterBkg:'#111713', clusterBorder:'#55665c', edgeLabelBackground:'#0b100e' },
        light: { background:'#fbfdfb', primaryColor:'#e8f0ec', primaryTextColor:'#25312d', primaryBorderColor:'#6e8d82', secondaryColor:'#f2f6f3', tertiaryColor:'#dce8e2', lineColor:'#617970', textColor:'#25312d', mainBkg:'#e8f0ec', nodeBorder:'#6e8d82', clusterBkg:'#f2f6f3', clusterBorder:'#a9bcb4', edgeLabelBackground:'#fbfdfb' }
      };
      const updateToggle = theme => { const dark = theme === 'dark'; toggle.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '☾'; toggle.querySelector('.theme-toggle-label').textContent = dark ? '亮色' : '暗色'; toggle.setAttribute('aria-label', dark ? '切换到亮色模式' : '切换到暗色模式'); toggle.title = toggle.getAttribute('aria-label'); };
      const renderDiagrams = async theme => {
        toggle.disabled = true;
        mermaid.initialize({ startOnLoad:false, securityLevel:'loose', theme:'base', themeVariables:{ ...palettes[theme], fontFamily:'Inter, "Noto Sans SC", sans-serif' }, flowchart:{ htmlLabels:true, curve:'basis', useMaxWidth:true }, gantt:{ useMaxWidth:true } });
        let failed = 0;
        for (const diagram of diagrams) {
          const node = document.createElement('div'); node.className = 'mermaid'; node.textContent = diagram.source; diagram.figure.replaceChildren(node);
          try { await mermaid.run({ nodes:[node] }); } catch (error) { failed += 1; console.error('Mermaid diagram rendering failed', error); const pre = document.createElement('pre'); const code = document.createElement('code'); code.className = 'language-mermaid'; code.textContent = diagram.source; pre.appendChild(code); diagram.figure.replaceChildren(pre); }
        }
        document.getElementById('mermaid-error')?.remove();
        if (failed) { const note = document.createElement('p'); note.id = 'mermaid-error'; note.className = 'mermaid-error'; note.textContent = failed + ' 张图表渲染失败，已保留源代码。'; report.prepend(note); }
        toggle.disabled = false;
      };
      const applyTheme = async (theme, remember = false) => { document.documentElement.dataset.theme = theme; themeColor.setAttribute('content', theme === 'dark' ? '#080a09' : '#f3f5f2'); updateToggle(theme); if (remember) { try { localStorage.setItem('work-summary-theme', theme); } catch {} } await renderDiagrams(theme); };
      toggle.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; void applyTheme(next, true); });
      void applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    })();
  </script>
</body>
</html>
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, output, 'utf8')
console.log(`Generated ${outputPath}`)
