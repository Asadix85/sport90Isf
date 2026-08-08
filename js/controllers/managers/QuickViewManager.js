/**
 * QuickViewManager.js - نمایش سریع محصول
 * مسئولیت: Quick View modal با hover/click
 */
class QuickViewManager {
    constructor(uiManager, comparisonService, shareService) {
        this.ui = uiManager;
        this.comparisonService = comparisonService;
        this.shareService = shareService;
        this.modal = null;
        this.onProductOpen = null;
        this.onToggleCompare = null;
        this.onShare = null;
    }

    init() {
        this._createModal();
        this._bindEvents();
    }

    _createModal() {
        const html = `
      <div id="quickViewModal" class="quickview-overlay">
        <div class="quickview-content">
          <button class="quickview-close" id="quickViewClose">✕</button>
          <div class="quickview-body" id="quickViewBody"></div>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.modal = document.getElementById('quickViewModal');
    }

    _bindEvents() {
        const closeBtn = document.getElementById('quickViewClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    open(product) {
        if (!this.modal || !product) return;

        const body = document.getElementById('quickViewBody');
        if (!body) return;

        const price = product.getFormattedPrice?.() || this.ui.formatPrice(product.price);
        const inCompare = this.comparisonService.hasProduct(product.code);

        body.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-image">
          ${product.hasImage?.()
            ? `<img src="${this.ui.escapeHtml(product.image)}" alt="${this.ui.escapeHtml(product.name)}">`
            : `<div class="quickview-placeholder">📷</div>`
        }
        </div>
        <div class="quickview-info">
          <h2 class="quickview-name">${this.ui.escapeHtml(product.name)}</h2>
          <div class="quickview-price">${price} تومان</div>
          <div class="quickview-meta">
            <span class="quickview-brand">🏷️ ${this.ui.escapeHtml(product.brand?.label || 'نامشخص')}</span>
            <span class="quickview-code">🔖 ${this.ui.escapeHtml(product.code || '')}</span>
            <span class="quickview-stock ${product.getStockClass?.() || 'available'}">
              ${product.getStockEmoji?.() || '✅'} ${product.getStockStatus?.() || 'موجود'}
            </span>
          </div>
          <p class="quickview-desc">${this.ui.escapeHtml(product.description || 'توضیحی ثبت نشده.')}</p>
          <div class="quickview-actions">
            <button class="quickview-btn primary" id="quickViewOpenFull">
              📄 مشاهده کامل
            </button>
            <button class="quickview-btn ${inCompare ? 'active' : ''}" id="quickViewCompare">
              ⚖️ ${inCompare ? 'در مقایسه' : 'افزودن به مقایسه'}
            </button>
            <button class="quickview-btn" id="quickViewShare">
              🔗 اشتراک
            </button>
          </div>
        </div>
      </div>
    `;

        // Bind actions
        const openFullBtn = body.querySelector('#quickViewOpenFull');
        if (openFullBtn) {
            openFullBtn.addEventListener('click', () => {
                this.close();
                if (this.onProductOpen) this.onProductOpen(product);
            });
        }

        const compareBtn = body.querySelector('#quickViewCompare');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                if (this.onToggleCompare) this.onToggleCompare(product);
                const nowInCompare = this.comparisonService.hasProduct(product.code);
                compareBtn.textContent = `⚖️ ${nowInCompare ? 'در مقایسه' : 'افزودن به مقایسه'}`;
                compareBtn.classList.toggle('active', nowInCompare);
            });
        }

        const shareBtn = body.querySelector('#quickViewShare');
        if (shareBtn) {
            shareBtn.addEventListener('click', async () => {
                if (this.onShare) this.onShare(product);
            });
        }

        this.modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.modal) {
            this.modal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    }
}