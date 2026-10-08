/**
 * EVIDENCE ENGINE
 * Handles loading of the aggregated STAR manifest and modal reveals
 */

class EvidenceEngine {
    constructor() {
        this.manifest = [];
        this.modal = null;
        this.init();
    }

    async init() {
        try {
            const response = await fetch('data/evidence_manifest.json');
            this.manifest = await response.json();
            console.log('Evidence Manifest Loaded:', this.manifest.length, 'entries');
            this.createModalContainer();
            this.bindTriggers();
        } catch (error) {
            console.error('Failed to load evidence manifest:', error);
        }
    }

    createModalContainer() {
        const modalHtml = `
            <div id="evidence-modal" class="modal-overlay">
                <button class="modal-close" id="modal-close">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="modal-content" id="modal-body">
                    <!-- Dynamic Content -->
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.modal = document.getElementById('evidence-modal');
        
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    bindTriggers() {
        // We will bind to any element with data-star-id
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-star-id]');
            if (trigger) {
                const starId = trigger.getAttribute('data-star-id');
                this.showEvidence(starId);
            }
        });
    }

    showEvidence(id) {
        const entry = this.manifest.find(item => item.id === id);
        if (!entry) return;

        const parseMD = (text) => {
            if (!text) return '';
            return text
                .replace(/^### (.*$)/gim, '<h3 class="h3" style="margin: 24px 0 16px 0;">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="h2" style="margin: 32px 0 20px 0;">$1</h2>')
                .replace(/^# (.*$)/gim, '<h1 class="h1" style="margin: 40px 0 24px 0;">$1</h1>')
                .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
                .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                .replace(/^- (.*$)/gim, '<li style="margin-bottom: 8px; padding-left: 12px; position: relative;">$1</li>')
                .replace(/`(.*?)`/gim, '<code style="background: var(--muted); padding: 2px 6px; font-family: var(--font-mono); font-size: 0.9em;">$1</code>')
                .replace(/\n/gim, '<br>')
                .replace(/(<li.*<\/li>)<br>/gim, '$1'); // clean up extra breaks in lists
        };

        const body = document.getElementById('modal-body');
        body.innerHTML = `
            <p class="text-mono text-accent" style="margin-bottom: 16px;">Case Study // ${entry.id}</p>
            <h2 class="h2" style="margin-bottom: 48px;">${entry.title}</h2>
            
            <div style="display: grid; grid-template-columns: 1fr; gap: 48px;">
                <section>
                    <h4 class="text-mono" style="margin-bottom: 16px;">Situation</h4>
                    <p class="text-lg">${parseMD(entry.situation)}</p>
                </section>
                <section>
                    <h4 class="text-mono" style="margin-bottom: 16px;">Task</h4>
                    <p class="text-lg">${parseMD(entry.task)}</p>
                </section>
                <section>
                    <h4 class="text-mono" style="margin-bottom: 16px;">Action</h4>
                    <p class="text-lg">${parseMD(entry.action)}</p>
                </section>
                <section style="border-top: 1px solid var(--border); padding-top: 48px;">
                    <h4 class="text-mono text-accent" style="margin-bottom: 16px;">Result</h4>
                    <div class="h3" style="color: var(--foreground); line-height: 1.4; font-size: var(--text-2xl);">${parseMD(entry.result)}</div>
                </section>
            </div>

            <div style="margin-top: 64px; display: flex; flex-wrap: wrap; gap: 8px;">
                ${entry.tech.map(t => `<span class="text-mono" style="background: var(--muted); padding: 4px 12px;">${t}</span>`).join('')}
            </div>
        `;

        this.modal.style.display = 'block';
        this.modal.scrollTop = 0; // Reset scroll position to top
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.evidenceEngine = new EvidenceEngine();
