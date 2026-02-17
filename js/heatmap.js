/* ==========================================
   heatmap.js — GitHub-style contribution grid
   Pure JS + inline SVG, no library needed.
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderHeatmap();
});

async function renderHeatmap() {
    const container = document.getElementById('heatmap');
    if (!container) return;

    try {
        const res = await fetch('data/calendar_heatmap.json');
        const raw = await res.json();

        // normalize: handle both array-of-objects and nested formats
        let days;
        if (Array.isArray(raw)) {
            // handle short keys (c, clr, d) or long keys (count, color, date)
            days = raw.map(item => ({
                date: item.date || item.d,
                count: item.count ?? item.c ?? 0,
                color: item.color || item.clr
            }));
        } else if (raw.weeks) {
            days = raw.weeks.flatMap(w =>
                w.contributionDays.map(d => ({
                    date: d.date,
                    count: d.contributionCount,
                    color: d.color
                }))
            );
        } else {
            console.error('Unknown heatmap format');
            return;
        }

        // sort by date ascending
        days.sort((a, b) => new Date(a.date) - new Date(b.date));

        const cellSize = 13;
        const cellGap = 3;
        const step = cellSize + cellGap;
        const monthLabelHeight = 20;

        // group by week columns (Sun = start of week like GitHub)
        const firstDate = new Date(days[0].date);
        const firstDay = firstDate.getDay(); // 0=Sun
        const totalWeeks = Math.ceil((days.length + firstDay) / 7);
        const svgWidth = totalWeeks * step + 40;
        const svgHeight = 7 * step + monthLabelHeight + 8;

        // create SVG
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.style.display = 'block';

        // tooltip element
        let tooltip = document.querySelector('.heatmap__tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'heatmap__tooltip';
            document.body.appendChild(tooltip);
        }

        // month labels
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let lastMonth = -1;

        // render cells
        days.forEach((day, i) => {
            const d = new Date(day.date);
            const dayOfWeek = d.getDay();
            const weekIndex = Math.floor((i + firstDay) / 7);
            const x = weekIndex * step + 28;
            const y = dayOfWeek * step + monthLabelHeight;

            // month label
            const month = d.getMonth();
            if (month !== lastMonth && d.getDate() <= 7) {
                lastMonth = month;
                const label = document.createElementNS(ns, 'text');
                label.setAttribute('x', x);
                label.setAttribute('y', 12);
                label.setAttribute('fill', '#71717a');
                label.setAttribute('font-size', '10');
                label.setAttribute('font-family', 'Inter, sans-serif');
                label.textContent = months[month];
                svg.appendChild(label);
            }

            const rect = document.createElementNS(ns, 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', cellSize);
            rect.setAttribute('height', cellSize);
            rect.setAttribute('rx', '2');
            rect.setAttribute('fill', getDarkColor(day.count, day.color));
            rect.style.cursor = 'pointer';

            rect.addEventListener('mouseenter', e => {
                const label = day.count === 1 ? 'contribution' : 'contributions';
                tooltip.textContent = `${day.count} ${label} on ${formatDate(d)}`;
                tooltip.style.opacity = '1';
                tooltip.style.left = e.clientX + 12 + 'px';
                tooltip.style.top = e.clientY - 32 + 'px';
            });
            rect.addEventListener('mousemove', e => {
                tooltip.style.left = e.clientX + 12 + 'px';
                tooltip.style.top = e.clientY - 32 + 'px';
            });
            rect.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            svg.appendChild(rect);
        });

        // day labels (Mon, Wed, Fri)
        ['Mon', 'Wed', 'Fri'].forEach((label, idx) => {
            const dayIndex = [1, 3, 5][idx];
            const text = document.createElementNS(ns, 'text');
            text.setAttribute('x', 0);
            text.setAttribute('y', dayIndex * step + monthLabelHeight + 10);
            text.setAttribute('fill', '#71717a');
            text.setAttribute('font-size', '10');
            text.setAttribute('font-family', 'Inter, sans-serif');
            text.textContent = label;
            svg.appendChild(text);
        });

        container.appendChild(svg);

    } catch (err) {
        console.error('Failed to render heatmap:', err);
        container.innerHTML = '<p style="color: var(--text-muted);">Failed to load contribution data.</p>';
    }
}

function getDarkColor(count, githubColor) {
    // map GitHub light-theme colors to dark-theme equivalents
    const darkMap = {
        '#ebedf0': '#161b22', // empty (light) → empty (dark)
        '#9be9a8': '#0e4429', // level 1
        '#40c463': '#006d32', // level 2
        '#30a14e': '#26a641', // level 3
        '#216e39': '#39d353'  // level 4
    };

    if (githubColor && darkMap[githubColor]) {
        return darkMap[githubColor];
    }

    // fallback to count-based
    if (count === 0) return '#161b22';
    if (count <= 3) return '#0e4429';
    if (count <= 9) return '#006d32';
    if (count <= 20) return '#26a641';
    return '#39d353';
}

function formatDate(d) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
