/**
 * ComparisonManager.js - مدیریت مقایسه محصولات
 * مسئولیت: comparison tray, modal
 */
export class ComparisonManager {
    constructor(comparisonService, uiManager) {
        this.comparisonService = comparisonService;
        this.ui = uiManager;
        this.elements = {};
    }

    init() {
        this.elements = {
            tray: document.getElementById('comparisonTray'),
            count: document.getElementById('comparisonCount'),
            chips: document.getElementById('comparisonChips'),
            showBtn: document.getElementById('showComparison'),
            clearBtn: document.getElementById('clearComparison'),
            modal: document.getElementById('comparisonModal'),
            table: document.getElementById('comparisonTable'),
            closeBtn: document.getElementById('closeComparisonModal'),
        };

        this._bindEvents();
        this.updateTray();
    }

    _bindEvents() {
        try {
            const { showBtn, clearBtn, closeBtn, modal } = this.elements;

            if (showBtn) {
                showBtn.addEventListener('click', () => {
                    this._renderModal();
                    if (modal) modal.style.display = 'flex';
                });
            }

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (confirm('آیا از پاک کردن لیست مقایسه مطمئن هستید؟')) {
                        this.comparisonService.clear();
                    }
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (modal) modal.style.display = 'none';
                });
            }

            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.style.display = 'none';
                });
            }
        } catch (error) {
            console.error('❌ [ComparisonManager._bindEvents] خطا:', error);
        }
    }

    updateTray() {
        try {
            const { tray, count, chips } = this.elements;
            if (!tray || !count || !chips) return;

            const items = this.comparisonService.getComparison();
            count.textContent = `${items.length}/${AppLimits.MAX_COMPARISON}`;

            if (items.length === 0) {
                tray.classList.remove('visible');
                return;
            }

            tray.classList.add('visible');

            chips.innerHTML = items
                .map((item) => `
          <span class="compare-chip">
            ${this.ui.escapeHtml(item.name)}
            <button class="chip-remove" data-code="${this.ui.escapeHtml(item.code)}" title="حذف">✕</button>
          </span>
        `)
                .join('');

            chips.querySelectorAll('.chip-remove').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.comparisonService.removeProduct(btn.dataset.code);
                });
            });
        } catch (error) {
            console.error('❌ [ComparisonManager.updateTray] خطا:', error);
        }
    }

    _renderModal() {
        try {
            const { table } = this.elements;
            if (!table) return;

            const items = this.comparisonService.getComparison();

            if (items.length < 2) {
                table.innerHTML = `
          <div style="text-align:center; padding:40px; color:var(--text-muted);">
            <div style="font-size: 48px;">⚖️</div>
            <p>برای مقایسه حداقل به 2 محصول نیاز دارید</p>
          </div>
        `;
                return;
            }

            const diffs = this.comparisonService.getDifferences(['price', 'brand', 'category', 'stockStatus']);

            const rows = [
                { label: 'نام', key: 'name', diff: false, format: (v) => this.ui.escapeHtml(v || '—') },
                { label: 'برند', key: 'brand', diff: diffs.brand, format: (v) => this.ui.escapeHtml(v?.label || v?.value || v || '—') },
                { label: 'دسته‌بندی', key: 'category', diff: diffs.category, format: (v) => this.ui.escapeHtml(v?.label || v?.value || v || '—') },
                { label: 'قیمت', key: 'price', diff: diffs.price, format: (v) => `${this.ui.formatPrice(v)} تومان` },
                { label: 'وضعیت', key: 'stockStatus', diff: diffs.stockStatus, format: (v) => this.ui.escapeHtml(v?.label || v?.value || v || '—') },
            ];

            const headerCells = items.map((item) => `<th>${this.ui.escapeHtml(item.name)}</th>`).join('');
            const bodyRows = rows
                .map((row) => `
          <tr>
            <th>${row.label}</th>
            ${items.map((item) => `<td class="${row.diff ? 'diff' : ''}">${row.format(item[row.key])}</td>`).join('')}
          </tr>
        `)
                .join('');

            table.innerHTML = `
        <table class="comparison-table">
          <thead><tr><th>ویژگی</th>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      `;
        } catch (error) {
            console.error('❌ [ComparisonManager._renderModal] خطا:', error);
        }
    }
}export { ComparisonManager };

export { ComparisonManager };
