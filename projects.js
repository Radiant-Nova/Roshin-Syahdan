/* Renders the Projects section (filter chips + cards) and the gallery lightbox
   from the PROJECTS / CATEGORIES lists in projects-data.js. */
(function () {
    const grid = document.getElementById('projects-grid');
    const filterBar = document.getElementById('project-filters');
    const countEl = document.getElementById('projects-count');
    const box = document.getElementById('lightbox');
    if (!grid || !filterBar || !box) return;

    /* ---------- tiny DOM helper ---------- */
    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        Object.entries(attrs || {}).forEach(([k, v]) => {
            if (v === undefined || v === null || v === false) return;
            if (k === 'class') node.className = v;
            else if (k === 'text') node.textContent = v;
            else node.setAttribute(k, v === true ? '' : v);
        });
        [].concat(children || []).forEach(c => c && node.append(c));
        return node;
    }
    const icon = cls => el('i', { class: cls, 'aria-hidden': 'true' });

    /* ---------- cards ---------- */
    function buildCard(p, i) {
        const hasGallery = Array.isArray(p.gallery) && p.gallery.length > 0;
        const links = p.links || [];
        const primaryLink = !hasGallery && links.length === 1 ? links[0] : null;
        const cls = ['project-card', p.featured ? 'is-featured' : '', 'fit-' + (p.fit || 'cover')]
            .filter(Boolean).join(' ');

        const img = el('img', {
            src: p.cover, alt: p.title, loading: 'lazy', decoding: 'async'
        });
        const badge = el('span', { class: 'project-badge' }, [
            icon(p.category === 'maps' ? 'fa-solid fa-map-location-dot' : 'fa-solid fa-layer-group'),
            document.createTextNode(' ' + (CATEGORIES[p.category] || p.category))
        ]);
        const hint = hasGallery
            ? el('span', { class: 'media-hint' }, [
                icon('fa-solid fa-expand'),
                document.createTextNode(p.gallery.length > 1 ? ' View ' + p.gallery.length + ' maps' : ' View image')
            ])
            : primaryLink
                ? el('span', { class: 'media-hint' }, [icon('fa-solid fa-arrow-up-right-from-square'),
                    document.createTextNode(' ' + primaryLink.label)])
                : null;

        let media;
        if (hasGallery) {
            media = el('button', {
                class: 'project-media', type: 'button',
                'aria-label': 'Open gallery: ' + p.title, 'data-open': p.id
            }, [img, badge, hint]);
        } else if (primaryLink) {
            media = el('a', {
                class: 'project-media', href: primaryLink.href, target: '_blank', rel: 'noopener',
                'aria-label': p.title + ' (opens in a new tab)'
            }, [img, badge, hint]);
        } else {
            media = el('div', { class: 'project-media is-static' }, [img, badge]);
        }

        const tags = el('div', { class: 'project-tags' },
            (p.tags || []).map(t => el('span', { class: 'project-tag', text: t })));

        const actions = el('div', { class: 'project-actions' });
        if (hasGallery) {
            actions.append(el('button', {
                class: 'project-link primary', type: 'button', 'data-open': p.id
            }, [icon('fa-solid fa-images'),
                document.createTextNode(p.gallery.length > 1 ? 'Explore maps' : 'View image')]));
        }
        links.forEach(l => actions.append(el('a', {
            class: 'project-link' + (!hasGallery ? ' primary' : ''), href: l.href, target: '_blank', rel: 'noopener'
        }, [icon('fa-solid fa-arrow-up-right-from-square'), document.createTextNode(l.label)])));

        const highlights = p.featured && p.highlights && p.highlights.length
            ? el('ul', { class: 'project-highlights' }, p.highlights.map(h =>
                el('li', {}, [el('strong', { text: h.value }), el('span', { text: h.label })])))
            : null;

        const main = [
            p.subtitle ? el('p', { class: 'project-sub', text: p.subtitle }) : null,
            el('h3', { text: p.title }),
            el('p', { class: 'project-desc', text: p.description })
        ];
        const side = [highlights, tags, actions.children.length ? actions : null];
        // featured hero card: text on the left, numbers / tags / buttons on the right
        const body = p.featured
            ? el('div', { class: 'project-body' }, [
                el('div', { class: 'project-main' }, main),
                el('div', { class: 'project-side' }, side)])
            : el('div', { class: 'project-body' }, main.concat(side));

        const card = el('article', { class: cls, 'data-category': p.category }, [media, body]);
        card.style.animationDelay = Math.min(i, 8) * 60 + 'ms';
        return card;
    }

    /* ---------- filter chips ---------- */
    const usedCats = Object.keys(CATEGORIES).filter(c => PROJECTS.some(p => p.category === c));
    let activeFilter = 'all';

    function chip(key, label, count) {
        const b = el('button', {
            class: 'filter-chip' + (key === activeFilter ? ' active' : ''), type: 'button',
            'data-filter': key, 'aria-pressed': key === activeFilter ? 'true' : 'false'
        }, [document.createTextNode(label), el('span', { class: 'count', text: String(count) })]);
        return b;
    }

    function renderFilters() {
        filterBar.replaceChildren(chip('all', 'All', PROJECTS.length),
            ...usedCats.map(c => chip(c, CATEGORIES[c], PROJECTS.filter(p => p.category === c).length)));
    }

    function renderGrid() {
        const list = PROJECTS.filter(p => activeFilter === 'all' || p.category === activeFilter);
        grid.replaceChildren(...list.map(buildCard));
        if (countEl) countEl.textContent = 'Showing ' + list.length + ' of ' + PROJECTS.length + ' projects';
    }

    filterBar.addEventListener('click', e => {
        const b = e.target.closest('[data-filter]');
        if (!b) return;
        activeFilter = b.dataset.filter;
        renderFilters();
        renderGrid();
    });

    grid.addEventListener('click', e => {
        const t = e.target.closest('[data-open]');
        if (!t) return;
        openLightbox(t.dataset.open, 0, t);
    });

    /* ---------- lightbox ---------- */
    const $ = id => document.getElementById(id);
    const lb = {
        img: $('lb-img'), stage: box.querySelector('.lb-stage'), cat: $('lb-cat'), title: $('lb-title'),
        sub: $('lb-sub'), caption: $('lb-caption'), desc: $('lb-desc'), facts: $('lb-facts'), tabs: $('lb-tabs'),
        full: $('lb-full'), links: $('lb-links'), prev: box.querySelector('.lb-prev'),
        next: box.querySelector('.lb-next'), counter: $('lb-counter')
    };
    let cur = { project: null, index: 0, opener: null, token: 0 };

    function showImage(index) {
        const p = cur.project;
        const n = p.gallery.length;
        cur.index = (index + n) % n;
        const item = p.gallery[cur.index];
        const token = ++cur.token;

        lb.stage.classList.add('is-loading');
        lb.img.alt = p.title + ' - ' + item.label;
        const preview = item.thumb || item.src;
        lb.img.src = preview;
        if (preview !== item.src) {
            const full = new Image();
            full.onload = () => { if (token === cur.token) { lb.img.src = item.src; lb.stage.classList.remove('is-loading'); } };
            full.onerror = () => { if (token === cur.token) lb.stage.classList.remove('is-loading'); };
            full.src = item.src;
        } else {
            lb.img.onload = () => { if (token === cur.token) lb.stage.classList.remove('is-loading'); };
        }

        lb.caption.textContent = item.caption || '';
        lb.caption.hidden = !item.caption;
        lb.full.href = item.src;
        lb.counter.textContent = n > 1 ? (cur.index + 1) + ' / ' + n : '';

        lb.facts.replaceChildren(...(item.facts || []).map(f =>
            el('div', { class: 'lb-fact' }, [el('span', { text: f.label }), el('strong', { text: f.value })])));
        lb.facts.hidden = !(item.facts && item.facts.length);

        [...lb.tabs.children].forEach((b, i) => {
            const on = i === cur.index;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
            b.tabIndex = on ? 0 : -1;
        });
        lb.prev.hidden = lb.next.hidden = n < 2;
    }

    function openLightbox(id, index, opener) {
        const p = PROJECTS.find(x => x.id === id);
        if (!p || !p.gallery || !p.gallery.length) return;
        cur.project = p;
        cur.opener = opener || null;

        lb.cat.textContent = CATEGORIES[p.category] || p.category;
        lb.title.textContent = p.title;
        lb.sub.textContent = p.subtitle || '';
        lb.sub.hidden = !p.subtitle;
        lb.desc.textContent = p.description;

        lb.tabs.replaceChildren(...p.gallery.map((g, i) => el('button', {
            class: 'lb-tab', type: 'button', role: 'tab', 'data-index': i, title: g.label
        }, [el('img', { src: g.thumb || g.src, alt: '', loading: 'lazy' }), el('span', { text: g.label })])));
        lb.tabs.hidden = p.gallery.length < 2;

        lb.links.replaceChildren(...(p.links || []).map(l => el('a', {
            class: 'project-link', href: l.href, target: '_blank', rel: 'noopener'
        }, [icon('fa-solid fa-arrow-up-right-from-square'), document.createTextNode(l.label)])));

        showImage(index);
        box.hidden = false;
        document.documentElement.classList.add('lb-open');
        requestAnimationFrame(() => box.classList.add('open'));
        box.querySelector('.lb-close').focus();
    }

    function closeLightbox() {
        if (box.hidden) return;
        box.classList.remove('open');
        document.documentElement.classList.remove('lb-open');
        cur.token++;
        setTimeout(() => { box.hidden = true; lb.img.removeAttribute('src'); }, 200);
        if (cur.opener && document.contains(cur.opener)) cur.opener.focus();
    }

    lb.tabs.addEventListener('click', e => {
        const b = e.target.closest('[data-index]');
        if (b) showImage(+b.dataset.index);
    });
    lb.prev.addEventListener('click', () => showImage(cur.index - 1));
    lb.next.addEventListener('click', () => showImage(cur.index + 1));
    box.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (box.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') showImage(cur.index - 1);
        else if (e.key === 'ArrowRight') showImage(cur.index + 1);
        else if (e.key === 'Tab') {
            const f = [...box.querySelectorAll('button:not([hidden]), a[href]')].filter(n => n.offsetParent !== null);
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    renderFilters();
    renderGrid();
})();
