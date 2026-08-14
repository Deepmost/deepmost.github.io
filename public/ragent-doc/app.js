    (() => {
      const navItems = [...document.querySelectorAll('.doc-nav-item')];
      const docs = [...document.querySelectorAll('.doc')];
      const empty = document.getElementById('empty');
      const toc = document.getElementById('toc');
      const keyFor = file => 'doc-' + file.replace(/\.md$/i, '').replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '').toLowerCase();
      const headingKey = value => value.trim().toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '');
      docs.forEach(doc => {
        const seen = new Map();
        doc.querySelectorAll('h1, h2, h3').forEach(heading => {
          const base = headingKey(heading.textContent) || 'section';
          const count = seen.get(base) || 0;
          seen.set(base, count + 1);
          heading.id = count ? base + '-' + count : base;
        });
      });
      const select = (file, anchor) => {
        const target = document.getElementById(keyFor(file)) || document.getElementById('doc-readme');
        if (!target) return;
        docs.forEach(doc => doc.classList.toggle('active', doc === target));
        navItems.forEach(item => item.classList.toggle('active', item.dataset.doc === file));
        empty.style.display = 'none';
        buildToc(target);
        if (anchor) {
          const heading = target.querySelector('#' + CSS.escape(anchor));
          if (heading) setTimeout(() => heading.scrollIntoView({ block: 'start' }), 0);
        } else window.scrollTo({ top: 0, behavior: 'instant' });
        history.replaceState(null, '', '#' + file.replace(/\.md$/i, ''));
      };
      const buildToc = doc => {
        const headings = [...doc.querySelectorAll('h2, h3')];
        toc.innerHTML = headings.length ? '<div class="toc-title">本页目录</div>' + headings.map(h => '<a class="level-' + h.tagName.slice(1) + '" href="#' + h.id + '">' + h.textContent + '</a>').join('') : '';
      };
      navItems.forEach(item => item.addEventListener('click', () => select(item.dataset.doc)));
      document.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (!link) return;
        const match = link.getAttribute('href')?.match(/^([^#]+\.md)(?:#(.*))?$/i);
        if (!match || !document.querySelector('.doc[data-file="' + CSS.escape(match[1]) + '"]')) return;
        event.preventDefault();
        select(match[1], match[2]);
      });
      const initial = decodeURIComponent(location.hash.slice(1));
      const initialFile = initial ? initial + '.md' : 'README.md';
      select(document.querySelector('.doc[data-file="' + CSS.escape(initialFile) + '"]') ? initialFile : 'README.md');
    })();
