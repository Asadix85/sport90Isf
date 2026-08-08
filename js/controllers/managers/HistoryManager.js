/**
 * HistoryManager.js - مدیریت تاریخچه مشاهده
 * مسئولیت: recently viewed products strip
 */
export class HistoryManager {
    constructor(historyService, uiManager) {
        this.historyService = historyService;
        this.ui = uiManager;
        this.elements = {};
        this.onItemClick = null; // callback
    }

    init() {
        this.elements = {
            section: document.getElementById('historySection'),
            strip: document.getElementById('historyStrip'),
            clearBtn: document.getElementById('clearHistory'),
        };

        if (this.elements.clearBtn) {
            this.elements.clearBtn.addEventListener('click', () => {
                if (confirm('آیا از پاک کردن تاریخچه مطمئن هستید؟')) {
                    this.historyService.clear();
                }
            });
        }

        this.render();
    }

    render() {
        try {
            const { section, strip } = this.elements;
            if (!strip || !section) return;

            const items = this.historyService.getLastViewed(5);

            if (items.length === 0) {
                section.style.display = 'none';
                return;
            }

            section.style.display = 'block';
            strip.innerHTML = items
                .map((item) => `
          <div class="history-item" data-code="${this.ui.escapeHtml(item.code)}">
            <span class="history-name">${this.ui.escapeHtml(item.name)}</span>
            <span class="history-price">${this.ui.formatPrice(item.price)} ت</span>
          </div>
        `)
                .join('');

            strip.querySelectorAll('.history-item').forEach((item) => {
                item.addEventListener('click', () => {
                    if (this.onItemClick) this.onItemClick(item.dataset.code);
                });
            });
        } catch (error) {
            console.error('❌ [HistoryManager.render] خطا:', error);
        }
    }
}export { HistoryManager };

export { HistoryManager };
