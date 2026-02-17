/* ==========================================
   charts.js — Language breakdown (Chart.js doughnut + DOM bars)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderLanguages();
});

async function renderLanguages() {
    try {
        const res = await fetch('data/evidence_data.json');
        const data = await res.json();
        const langData = data.languageBreakdown || [];

        // handle both array and object formats, top 10
        let entries;
        if (Array.isArray(langData)) {
            entries = langData
                .map(item => ({
                    name: item.name,
                    bytes: item.bytes || 0,
                    color: item.color || '#8b8b8b'
                }))
                .sort((a, b) => b.bytes - a.bytes)
                .slice(0, 10);
        } else {
            entries = Object.entries(langData)
                .map(([name, info]) => ({
                    name,
                    bytes: info.bytes || 0,
                    color: info.color || '#8b8b8b'
                }))
                .sort((a, b) => b.bytes - a.bytes)
                .slice(0, 10);
        }

        if (entries.length === 0) return;

        const totalBytes = entries.reduce((sum, e) => sum + e.bytes, 0);

        // add percentage
        entries.forEach(e => {
            e.pct = ((e.bytes / totalBytes) * 100);
        });

        renderStackedBar(entries);
        renderLangList(entries);
        renderDoughnut(entries);

    } catch (err) {
        console.error('Failed to render languages:', err);
    }
}

/* ===== STACKED BAR ===== */
function renderStackedBar(entries) {
    const bar = document.getElementById('lang-stacked-bar');
    if (!bar) return;

    bar.innerHTML = entries.map(e =>
        `<div class="lang__stacked-segment" style="width: ${e.pct}%; background: ${e.color};" title="${e.name}: ${e.pct.toFixed(1)}%"></div>`
    ).join('');
}

/* ===== LANGUAGE LIST WITH BARS ===== */
function renderLangList(entries) {
    const list = document.getElementById('lang-list');
    if (!list) return;

    list.innerHTML = entries.map(e => `
        <div class="lang__row">
            <span class="lang__dot" style="background: ${e.color}"></span>
            <span class="lang__name">${e.name}</span>
            <div class="lang__bar-wrap">
                <div class="lang__bar-fill" style="width: 0%; background: ${e.color};" data-width="${e.pct}%"></div>
            </div>
            <span class="lang__pct">${e.pct.toFixed(1)}%</span>
        </div>
    `).join('');

    // animate bars on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.lang__bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(list);
}

/* ===== DOUGHNUT CHART ===== */
function renderDoughnut(entries) {
    const canvas = document.getElementById('lang-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e.name),
            datasets: [{
                data: entries.map(e => e.bytes),
                backgroundColor: entries.map(e => e.color),
                borderWidth: 0,
                hoverBorderWidth: 2,
                hoverBorderColor: '#e4e4e7',
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#e4e4e7',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    titleFont: { family: 'Inter', weight: '600' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: function (ctx) {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.parsed / total) * 100).toFixed(1);
                            return ` ${pct}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1200,
                easing: 'easeOutQuart'
            }
        }
    });
}
