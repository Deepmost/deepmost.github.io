import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = resolve(root, 'src/content/reports/internship-work-summary.md')
const outputPath = resolve(root, 'public/internship-work-summary/index.html')
const mermaidPath = resolve(root, 'node_modules/mermaid/dist/mermaid.min.js')
const mermaidOutputPath = resolve(dirname(outputPath), 'mermaid.min.js')

const raw = await readFile(sourcePath, 'utf8')
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
  html: true,
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

md.renderer.rules.table_open = () => '<div class="table-scroll" role="region" aria-label="数据表格" tabindex="0">\n<table>\n'
md.renderer.rules.table_close = () => '</table>\n</div>\n'

const html = md.render(body)
const toc = headings
  .filter((heading) => heading.level >= 2)
  .map((heading) => `<a class="toc-link level-${heading.level}" href="#${heading.id}">${escapeHtml(heading.text)}</a>`)
  .join('')

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
    body { margin:0; color:var(--ink); background:var(--canvas); font:15px/1.85 Inter,"Noto Sans SC","Microsoft YaHei",sans-serif; letter-spacing:0; transition:color .25s ease,background-color .25s ease; }
    a { color:var(--teal); text-underline-offset:3px; }
    a:hover { color:var(--link-hover); }
    .app-shell { min-height:100vh; display:grid; grid-template-columns:280px minmax(0,1fr); }
    .sidebar { position:sticky; top:0; height:100vh; overflow:auto; padding:28px 18px 24px; border-right:1px solid var(--line); background:var(--sidebar); transition:background-color .25s ease,border-color .25s ease; }
    .brand { padding:0 10px 22px; border-bottom:1px solid var(--line); }
    .brand-mark { display:inline-flex; width:30px; height:30px; align-items:center; justify-content:center; margin-right:9px; border:1px solid var(--accent-border); border-radius:6px; color:var(--teal); font:bold 13px ui-monospace,monospace; }
    .brand h1 { display:inline; margin:0; font-size:16px; letter-spacing:0; }
    .brand p { margin:9px 0 0; color:var(--faint); font-size:11px; line-height:1.5; }
    .nav-label { margin:25px 10px 8px; color:var(--faint); font:10px ui-monospace,monospace; letter-spacing:0; text-transform:uppercase; }
    .doc-nav { display:flex; flex-direction:column; gap:2px; }
    .toc-link { display:block; padding:8px 10px; border-left:1px solid transparent; color:var(--muted); text-decoration:none; font-size:12px; line-height:1.45; }
    .toc-link.level-3 { padding-left:23px; font-size:11px; }
    .toc-link:hover { border-left-color:var(--teal); background:var(--surface-hover); color:var(--ink); }
    .toc-link.is-active { border-left-color:var(--amber); background:var(--surface-hover); color:var(--strong); }
    .sidebar-foot { margin:22px 10px 0; padding-top:14px; border-top:1px solid var(--line); color:var(--faint); font-size:10px; line-height:1.6; }
    .content-shell { min-width:0; padding:26px clamp(18px,4vw,68px) 70px; }
    main { max-width:1160px; margin:0 auto; }
    .report-head { padding:15px 0 35px; border-bottom:1px solid var(--line); }
    .kicker { color:var(--faint); font:10px ui-monospace,monospace; letter-spacing:0; text-transform:uppercase; }
    .report-head h1 { max-width:900px; margin:15px 0 12px; color:var(--ink); font-size:48px; line-height:1.18; letter-spacing:0; }
    .lede { max-width:820px; margin:0; color:var(--muted); font-size:15px; }
    .stats { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); max-width:900px; margin-top:26px; border:1px solid var(--line); }
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
    .table-scroll { width:100%; max-width:100%; margin:18px 0; overflow:auto; border:1px solid var(--line); }
    .table-scroll:focus-visible { outline:2px solid var(--teal); outline-offset:2px; }
    .doc table { width:100%; min-width:680px; border-collapse:collapse; font-size:13px; }
    .doc th, .doc td { padding:8px 10px; border:1px solid var(--line); text-align:left; vertical-align:top; }
    .doc tr:first-child th { border-top:0; }
    .doc tr:last-child td { border-bottom:0; }
    .doc th:first-child, .doc td:first-child { border-left:0; }
    .doc th:last-child, .doc td:last-child { border-right:0; }
    .doc th { background:var(--table-head-bg); color:var(--table-head-ink); white-space:nowrap; }
    .doc img { max-width:100%; height:auto; }
    .doc hr { margin:30px 0; border:0; border-top:1px solid var(--line); }
    .architecture-diagram { width:100%; margin:22px 0 28px; padding:15px; overflow:auto; border:1px solid var(--diagram-border); border-radius:6px; background:var(--diagram-bg); transition:background-color .25s ease,border-color .25s ease; }
    .architecture-diagram .mermaid { min-width:650px; }
    .architecture-diagram svg { display:block; min-width:650px; max-width:100%; height:auto; margin:0 auto; }
    .mermaid-error { margin:14px 0; padding:9px 12px; border-left:2px solid var(--amber); background:var(--error-bg); color:var(--quote-text); font-size:12px; }
    .reading-progress { position:fixed; z-index:30; top:0; left:0; width:0; height:2px; background:var(--amber); pointer-events:none; }
    .floating-tools { position:fixed; z-index:20; top:18px; right:18px; display:flex; flex-direction:column; gap:8px; }
    .icon-button { display:inline-flex; width:38px; height:38px; align-items:center; justify-content:center; padding:0; border:1px solid var(--line); border-radius:50%; color:var(--ink); background:color-mix(in srgb,var(--surface) 92%,transparent); box-shadow:var(--toggle-shadow); backdrop-filter:blur(12px); cursor:pointer; font:17px/1 "Microsoft YaHei",sans-serif; transition:transform .2s ease,opacity .2s ease,color .25s ease,background-color .25s ease,border-color .25s ease; }
    .icon-button:hover { transform:translateY(-1px); border-color:var(--accent-border); }
    .icon-button:focus-visible { outline:2px solid var(--teal); outline-offset:3px; }
    .icon-button:disabled { cursor:wait; opacity:.65; transform:none; }
    .back-to-top { opacity:0; pointer-events:none; }
    .back-to-top.is-visible { opacity:1; pointer-events:auto; }
    @media (max-width:900px) { .app-shell { grid-template-columns:1fr; } .sidebar { position:relative; height:auto; border-right:0; border-bottom:1px solid var(--line); padding:16px 68px 16px 16px; } .brand { padding-bottom:14px; } .doc-nav { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); } .toc-link.level-3 { display:none; } .content-shell { padding:8px 14px 45px; } .report-grid { margin-top:24px; } .toc-link { width:auto; margin-right:5px; padding:5px 8px; border:1px solid var(--line); } .floating-tools { top:12px; right:12px; } .report-head h1 { font-size:40px; } }
    @media (max-width:540px) { .doc-nav { grid-template-columns:1fr; } .stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .stat:nth-child(2) { border-right:0; } .stat:nth-child(-n+2) { border-bottom:1px solid var(--line); } .report-head h1 { font-size:32px; } .doc { font-size:14px; } .architecture-diagram { padding:9px; } }
    @media print { body { background:#fff; color:#111; } .sidebar, .floating-tools, .reading-progress { display:none; } .app-shell { display:block; } .content-shell { padding:0; } .architecture-diagram, .table-scroll, pre, blockquote { break-inside:avoid; } }
  </style>
</head>
<body>
  <div class="reading-progress" id="reading-progress" aria-hidden="true"></div>
  <div class="floating-tools">
    <button class="icon-button theme-toggle" id="theme-toggle" type="button"><span class="theme-toggle-icon" aria-hidden="true">☀</span></button>
    <button class="icon-button back-to-top" id="back-to-top" type="button" aria-label="返回顶部" title="返回顶部"><span aria-hidden="true">↑</span></button>
  </div>
  <div class="app-shell">
    <aside class="sidebar" aria-label="报告目录">
      <div class="brand"><span class="brand-mark">实</span><h1>实习工作贡献</h1><p>工程复盘报告</p></div>
      <div class="nav-label">Report index</div>
      <nav class="doc-nav">${toc}</nav>
      <div class="sidebar-foot">统计范围：2026-04-09 ~ 2026-08-14<br>141 次 Git 提交 · 10 个贡献仓库<br>另核验 3 个 AI Study 快照工程</div>
    </aside>
    <section class="content-shell">
      <main>
        <header class="report-head">
          <div class="kicker">Internship / Engineering Contribution</div>
          <h1>李超 · 工作贡献梳理</h1>
          <p class="lede">18 周，贯穿 3 条既有业务线与 1 个 AI 原生学习新域。从 AI 教学、学习数据可信到站点成本归因，梳理业务价值、架构判断与工程证据。</p>
          <div class="stats">
            <div class="stat"><strong>141</strong><span>次 Git 提交</span></div>
            <div class="stat"><strong>10</strong><span>个贡献仓库</span></div>
            <div class="stat"><strong>3</strong><span>个快照工程</span></div>
            <div class="stat"><strong>18</strong><span>周工作跨度</span></div>
          </div>
        </header>
        <div class="report-grid">
          <article class="doc">${html}</article>
        </div>
      </main>
    </section>
  </div>
  <script src="./mermaid.min.js"></script>
  <script>
    (() => {
      const blocks = [...document.querySelectorAll('pre > code.language-mermaid')];
      const report = document.querySelector('.doc');
      const toggle = document.getElementById('theme-toggle');
      const backToTop = document.getElementById('back-to-top');
      const readingProgress = document.getElementById('reading-progress');
      const themeColor = document.getElementById('theme-color');
      const diagrams = blocks.map((code, index) => { const figure = document.createElement('figure'); figure.id = 'diagram-' + (index + 1); figure.className = 'architecture-diagram'; figure.setAttribute('aria-label', '架构或数据流程图'); const source = code.textContent || ''; code.parentElement.replaceWith(figure); return { figure, source, index }; });
      const palettes = {
        dark: { background:'#0b100e', primaryColor:'#18201c', primaryTextColor:'#dedbc8', primaryBorderColor:'#718c7f', secondaryColor:'#111713', tertiaryColor:'#202922', lineColor:'#94a79b', textColor:'#dedbc8', mainBkg:'#18201c', nodeBorder:'#718c7f', clusterBkg:'#111713', clusterBorder:'#55665c', edgeLabelBackground:'#0b100e' },
        light: { background:'#fbfdfb', primaryColor:'#e8f0ec', primaryTextColor:'#25312d', primaryBorderColor:'#6e8d82', secondaryColor:'#f2f6f3', tertiaryColor:'#dce8e2', lineColor:'#617970', textColor:'#25312d', mainBkg:'#e8f0ec', nodeBorder:'#6e8d82', clusterBkg:'#f2f6f3', clusterBorder:'#a9bcb4', edgeLabelBackground:'#fbfdfb' }
      };
      const updateToggle = theme => { const dark = theme === 'dark'; toggle.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '☾'; toggle.setAttribute('aria-label', dark ? '切换到亮色模式' : '切换到暗色模式'); toggle.title = toggle.getAttribute('aria-label'); };
      const renderDiagrams = async theme => {
        window.__workSummaryRenderState = 'rendering';
        toggle.disabled = true;
        mermaid.initialize({ startOnLoad:false, securityLevel:'loose', suppressErrorRendering:true, theme:'base', themeVariables:{ ...palettes[theme], fontFamily:'Inter, "Noto Sans SC", sans-serif' }, flowchart:{ htmlLabels:true, curve:'basis', useMaxWidth:true }, gantt:{ useMaxWidth:true } });
        const failedLabels = [];
        const updateErrorNote = () => {
          let note = document.getElementById('mermaid-error');
          if (!failedLabels.length) { note?.remove(); return; }
          if (!note) { note = document.createElement('p'); note.id = 'mermaid-error'; note.className = 'mermaid-error'; report.prepend(note); }
          note.textContent = failedLabels.length + ' 张图表渲染失败，已保留源代码：' + failedLabels.join('；');
        };
        updateErrorNote();
        const nodes = diagrams.map(diagram => {
          const node = document.createElement('div'); node.className = 'mermaid'; node.textContent = diagram.source; diagram.figure.replaceChildren(node);
          return node;
        });
        await mermaid.run({ nodes, suppressErrors:true });
        diagrams.forEach((diagram, index) => {
          if (nodes[index].querySelector('svg')) return;
          const label = diagram.source.split(/\\r?\\n/).map(line => line.trim()).find((line, lineIndex) => lineIndex > 0 && line);
          failedLabels.push('#' + (diagram.index + 1) + (label ? ' ' + label : ''));
          const pre = document.createElement('pre'); const code = document.createElement('code'); code.className = 'language-mermaid'; code.textContent = diagram.source; pre.appendChild(code); diagram.figure.replaceChildren(pre);
        });
        if (failedLabels.length) {
          console.error('Mermaid diagram rendering failed:', failedLabels.join('; '));
        }
        updateErrorNote();
        if (location.hash.startsWith('#diagram-')) document.getElementById(location.hash.slice(1))?.scrollIntoView();
        toggle.disabled = false;
        window.__workSummaryRenderState = 'complete';
      };
      const applyTheme = async (theme, remember = false) => { document.documentElement.dataset.theme = theme; themeColor.setAttribute('content', theme === 'dark' ? '#080a09' : '#f3f5f2'); updateToggle(theme); if (remember) { try { localStorage.setItem('work-summary-theme', theme); } catch {} } await renderDiagrams(theme); };
      toggle.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; void applyTheme(next, true); });
      backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
      const updateScrollState = () => { const max = document.documentElement.scrollHeight - innerHeight; const ratio = max > 0 ? scrollY / max : 0; readingProgress.style.width = (ratio * 100) + '%'; backToTop.classList.toggle('is-visible', scrollY > innerHeight); };
      addEventListener('scroll', updateScrollState, { passive:true });
      addEventListener('resize', updateScrollState);
      updateScrollState();
      const navById = new Map([...document.querySelectorAll('.toc-link')].map(link => [link.getAttribute('href').slice(1), link]));
      const observer = new IntersectionObserver(entries => { for (const entry of entries) { if (!entry.isIntersecting) continue; document.querySelector('.toc-link.is-active')?.classList.remove('is-active'); navById.get(entry.target.id)?.classList.add('is-active'); } }, { rootMargin:'-12% 0px -78% 0px' });
      document.querySelectorAll('.doc h2, .doc h3').forEach(heading => observer.observe(heading));
      void applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    })();
  </script>
</body>
</html>
`

await mkdir(dirname(outputPath), { recursive: true })
await Promise.all([
  writeFile(outputPath, output, 'utf8'),
  copyFile(mermaidPath, mermaidOutputPath),
])
console.log(`Generated ${outputPath}`)
