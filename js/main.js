/* ==========================================
   main.js — Navigation, scroll, data loading
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollReveal();
    initTimeline();
    loadHeroStats();
    loadEvidenceStrip();
    loadTechRadar();
    loadSectorBreakdown();
    loadProjects();
});

/* ===== NAVIGATION ===== */
function initNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const nav = document.getElementById('nav');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('nav__links--open');
        });

        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('nav__links--open');
            });
        });
    }

    // scroll spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

    window.addEventListener('scroll', () => {
        // shrink nav
        if (nav) {
            nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        }

        // active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);

        // Stagger child cards within each section
        section.querySelectorAll('.glass-card').forEach((card, i) => {
            card.classList.add('reveal');
            card.style.setProperty('--delay', `${i * 80}ms`);
            observer.observe(card);
        });
    });
}

/* ===== HERO STATS ===== */
async function loadHeroStats() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();

        const container = document.getElementById('hero-stats');
        const hero = data.heroStats || {};

        const stats = [
            { value: (hero.calendarContributions || 0).toLocaleString(), label: 'Contributions' },
            { value: (hero.yearsActive || 0) + '+', label: 'Years Active' },
            { value: (hero.totalProjects || 0) + '+', label: 'Projects' },
            { value: data.stats?.yearsExperience || '12+', label: 'Years Experience' }
        ];

        container.innerHTML = stats.map(s => `
            <div class="hero__stat">
                <span class="hero__stat-value">${s.value}</span>
                <span class="hero__stat-label">${s.label}</span>
            </div>
        `).join('');
    } catch (err) {
        console.error('Failed to load hero stats:', err);
    }
}

/* ===== EVIDENCE STRIP (count-up) ===== */
async function loadEvidenceStrip() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();
        const stats = data.stats;

        const container = document.getElementById('evidence-stats');
        const items = [
            { value: stats.yearsExperience, label: 'Years Experience', isText: true },
            { value: stats.totalProjects, label: 'Projects Shipped', isText: false },
            { value: stats.industries, label: 'Industries', isText: false },
            { value: stats.totalCommits, label: 'Commits', isText: false, suffix: '+' },
        ];

        container.innerHTML = items.map(item => {
            const displayVal = item.isText ? item.value : '0';
            const suffix = item.suffix || '';
            return `
                <div class="evidence-strip__item">
                    <span class="evidence-strip__value" ${!item.isText ? `data-count-target="${item.value}" data-count-suffix="${suffix}"` : ''}>${displayVal}${suffix}</span>
                    <span class="evidence-strip__label">${item.label}</span>
                </div>
            `;
        }).join('');

        // Animate count-up on scroll
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    container.querySelectorAll('[data-count-target]').forEach(el => {
                        animateCountUp(el, parseInt(el.dataset.countTarget), el.dataset.countSuffix || '');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(container);
    } catch (err) {
        console.error('Failed to load evidence strip:', err);
    }
}

function animateCountUp(element, target, suffix) {
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(update);
}

/* ===== INTERACTIVE TECH RADAR ===== */
const RADAR_COLORS = [
    { bg: 'rgba(255, 87, 34, 0.55)', border: '#FF5722' },   // Backend & API — accent
    { bg: 'rgba(41, 182, 246, 0.55)', border: '#29B6F6' },   // Frontend — sky
    { bg: 'rgba(171, 71, 188, 0.55)', border: '#AB47BC' },   // Mobile & Desktop — violet
    { bg: 'rgba(102, 187, 106, 0.55)', border: '#66BB6A' },  // Data & Databases — green
    { bg: 'rgba(255, 167, 38, 0.55)', border: '#FFA726' },   // DevOps & Infrastructure — amber
    { bg: 'rgba(239, 83, 80, 0.55)', border: '#EF5350' },   // ML & Trading — red
    { bg: 'rgba(78, 205, 196, 0.55)', border: '#4ECDC4' },   // Extra — teal
];

let radarChart = null;
let radarSkillsData = null;
let activeCategory = null;

async function loadTechRadar() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();
        const skills = data.skills;
        if (!skills) return;

        radarSkillsData = skills;

        const categories = Object.keys(skills);
        const techCounts = categories.map(cat => skills[cat].length);
        const totalProjects = categories.map(cat =>
            skills[cat].reduce((sum, t) => sum + t.projects, 0)
        );

        const canvas = document.getElementById('tech-radar-canvas');
        if (!canvas) return;

        // Build Polar Area chart
        radarChart = new Chart(canvas.getContext('2d'), {
            type: 'polarArea',
            data: {
                labels: categories,
                datasets: [{
                    data: techCounts,
                    backgroundColor: categories.map((_, i) => RADAR_COLORS[i % RADAR_COLORS.length].bg),
                    borderColor: categories.map((_, i) => RADAR_COLORS[i % RADAR_COLORS.length].border),
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        display: false,
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.95)',
                        titleColor: '#e4e4e7',
                        bodyColor: '#a1a1aa',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        callbacks: {
                            title: (items) => items[0].label,
                            label: (item) => {
                                const idx = item.dataIndex;
                                const cat = categories[idx];
                                const count = techCounts[idx];
                                const projects = totalProjects[idx];
                                return [
                                    `${count} technologies`,
                                    `${projects} total project references`,
                                ];
                            }
                        }
                    }
                },
                onClick: (_evt, elements) => {
                    if (elements.length > 0) {
                        toggleCategory(categories[elements[0].index]);
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200,
                    easing: 'easeOutQuart',
                }
            }
        });

        // Render legend pills
        const legendEl = document.getElementById('tech-radar-legend');
        if (legendEl) {
            legendEl.innerHTML = categories.map((cat, i) => {
                const color = RADAR_COLORS[i % RADAR_COLORS.length].border;
                const count = techCounts[i];
                return `
                    <button class="tech-radar__pill" data-category="${cat}" type="button">
                        <span class="tech-radar__pill-dot" style="background:${color}"></span>
                        ${cat}
                        <span class="tech-radar__pill-count">(${count})</span>
                    </button>
                `;
            }).join('');

            legendEl.addEventListener('click', (e) => {
                const pill = e.target.closest('.tech-radar__pill');
                if (pill) toggleCategory(pill.dataset.category);
            });
        }

    } catch (err) {
        console.error('Failed to load tech radar:', err);
    }
}

function toggleCategory(category) {
    const detailEl = document.getElementById('tech-radar-detail');
    const pills = document.querySelectorAll('.tech-radar__pill');

    if (activeCategory === category) {
        // Close
        activeCategory = null;
        detailEl.classList.remove('open');
        pills.forEach(p => p.classList.remove('active'));
        highlightSegment(-1);
        return;
    }

    activeCategory = category;

    // Highlight pill
    pills.forEach(p => {
        p.classList.toggle('active', p.dataset.category === category);
    });

    // Highlight chart segment
    const categories = Object.keys(radarSkillsData);
    highlightSegment(categories.indexOf(category));

    // Render detail panel
    const items = radarSkillsData[category];
    const colorIdx = categories.indexOf(category);
    const color = RADAR_COLORS[colorIdx % RADAR_COLORS.length].border;

    detailEl.innerHTML = `
        <div class="tech-radar__detail-inner">
            <div class="tech-radar__detail-title">
                <span class="tech-radar__detail-title-dot" style="background:${color}"></span>
                ${category}
            </div>
            <div class="tech-radar__techs">
                ${items.map(t => `
                    <div class="tech-radar__tech-item">
                        <span>${t.name}</span>
                        <span class="tech-radar__tech-count">${t.projects} proj${t.projects !== 1 ? 's' : ''}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Trigger open after content is set
    requestAnimationFrame(() => {
        detailEl.classList.add('open');
    });
}

function highlightSegment(activeIndex) {
    if (!radarChart) return;
    const dataset = radarChart.data.datasets[0];
    const categories = Object.keys(radarSkillsData);

    dataset.backgroundColor = categories.map((_, i) => {
        const base = RADAR_COLORS[i % RADAR_COLORS.length];
        if (activeIndex === -1) return base.bg;
        return i === activeIndex ? base.bg : base.bg.replace('0.55', '0.15');
    });

    dataset.borderWidth = categories.map((_, i) => {
        if (activeIndex === -1) return 2;
        return i === activeIndex ? 3 : 1;
    });

    radarChart.update('none');
}

/* ===== TIMELINE (Phase 2: monograms, expand/collapse, scroll-progress) ===== */
function initTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const items = timeline.querySelectorAll('.timeline__item');

    // --- Expand / Collapse ---
    items.forEach(item => {
        const bullets = item.querySelector('.timeline__bullets');
        const toggle = item.querySelector('.timeline__toggle');
        if (!bullets || !toggle) return;

        const liCount = bullets.querySelectorAll('li').length;
        if (liCount <= 2) {
            toggle.remove();
            return;
        }

        // Start collapsed
        bullets.classList.add('collapsed');
        toggle.style.display = 'inline-flex';

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            bullets.classList.toggle('collapsed', !expanded ? false : true);
            toggle.querySelector('.timeline__toggle-text').textContent = expanded ? 'Show more' : 'Show less';
        });
    });

    // --- Staggered scroll reveal ---
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => revealObserver.observe(item));

    // --- Scroll-driven progress line (real DOM element) ---
    const progressBar = document.createElement('div');
    progressBar.className = 'timeline__progress';
    progressBar.setAttribute('aria-hidden', 'true');
    timeline.prepend(progressBar);

    function updateProgressBar() {
        const rect = timeline.getBoundingClientRect();
        const viewportMid = window.innerHeight * 0.6;
        const scrolled = viewportMid - rect.top;
        const pct = Math.max(0, Math.min(rect.height, scrolled));
        progressBar.style.height = `${pct}px`;
    }

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();
}

/* ===== PROJECTS (public only) ===== */
async function loadProjects() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();

        const container = document.getElementById('projects-grid');
        const projects = data.personalHighlights || [];

        // filter: only explicitly public repos
        const publicProjects = projects.filter(p => p.public === true);

        if (publicProjects.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted);">Public projects coming soon.</p>';
            return;
        }

        // language color map from languageBreakdown
        const langColors = {};
        (data.languageBreakdown || []).forEach(l => {
            langColors[l.name] = l.color;
        });

        container.innerHTML = publicProjects.map(p => {
            const lang = p.lang || p.language;
            const langColor = langColors[lang] || '#8b8b8b';
            const langDot = lang
                ? `<span class="project-card__lang"><span class="project-card__lang-dot" style="background: ${langColor}"></span>${lang}</span>`
                : '';

            const url = p.url || `https://github.com/ugurhangul/${p.name}`;
            const desc = p.desc || p.description || 'No description provided.';

            return `
                <div class="glass-card project-card">
                    <div class="project-card__header">
                        <div class="project-card__name"><a href="${url}" target="_blank">${p.name}</a></div>
                        <span class="project-card__visibility">public</span>
                    </div>
                    <p class="project-card__desc">${desc}</p>
                    <div class="project-card__footer">
                        ${langDot}
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error('Failed to load projects:', err);
    }
}

/* ===== SECTOR BREAKDOWN (enhanced with tech pills) ===== */
async function loadSectorBreakdown() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();
        const sectors = data.sectors || [];

        const container = document.getElementById('sector-chart');
        if (!container || sectors.length === 0) {
            if (container) container.innerHTML = '<p style="color: var(--text-muted);">Sector data coming soon.</p>';
            return;
        }

        // Update subtitle with actual count
        const subtitle = document.getElementById('sector-subtitle');
        if (subtitle) {
            const totalProjects = sectors.reduce((sum, s) => sum + s.projects, 0);
            subtitle.textContent = `Sectors I've delivered for across ${totalProjects} projects`;
        }

        // Filter out "Other" for cleaner display, sort by project count
        const displaySectors = sectors
            .filter(s => s.sector !== 'Other')
            .sort((a, b) => b.projects - a.projects);

        const maxProjects = displaySectors[0]?.projects || 1;

        container.innerHTML = displaySectors.map(s => {
            const pct = (s.projects / maxProjects) * 100;
            const isNarrow = pct < 25;
            const countInside = !isNarrow
                ? `<span class="sector-row__count">${s.projects} projects</span>`
                : '';
            const countOutside = isNarrow
                ? `<span class="sector-row__count--outside">${s.projects}</span>`
                : '';

            const techPills = (s.topTechs || []).map(t =>
                `<span class="sector-row__tech-pill">${t}</span>`
            ).join('');

            return `
                <div class="sector-row__wrapper">
                    <div class="sector-row">
                        <span class="sector-row__label">${s.sector}</span>
                        <div class="sector-row__bar-wrap">
                            <div class="sector-row__bar-fill" style="width: 0%; background: ${s.color};" data-width="${pct}%">
                                ${countInside}
                            </div>
                        </div>
                        ${countOutside}
                    </div>
                    ${techPills ? `<div class="sector-row__techs">${techPills}</div>` : ''}
                </div>
            `;
        }).join('');

        // animate bars on scroll into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = container.querySelectorAll('.sector-row__bar-fill');
                    bars.forEach((bar, i) => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width;
                        }, i * 80);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(container);
    } catch (err) {
        console.error('Failed to load sector breakdown:', err);
    }
}
