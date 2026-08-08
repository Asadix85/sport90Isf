/**
 * ProductRenderer.js - رندر محصولات، دسته‌ها و جزئیات
 * مسئولیت: تولید HTML برای محصولات
 */
class ProductRenderer {
    constructor(uiManager, comparisonService, shareService) {
        this.ui = uiManager;
        this.comparisonService = comparisonService;
        this.shareService = shareService;
        this.onProductClick = null; // callback
        this.onToggleCompare = null; // callback
        this.onShare = null; // callback
    }

    /**
     * رندر دسته‌بندی‌های اصلی
     */
    renderCategories(categories, container) {
        try {
            if (!container) return;
            container.innerHTML = '';

            if (!categories || categories.length === 0) {
                container.innerHTML = `
          <div style="text-align:center; padding:40px; color:var(--text-muted);">
            <p>⚠️ هیچ دسته‌بندی‌ای وجود ندارد</p>
          </div>
        `;
                return;
            }

            categories.forEach((cat) => {
                const card = document.createElement('div');
                card.className = 'category-card';
                card.innerHTML = `
          <span class="emoji">${this.ui.escapeHtml(cat.emoji || '📂')}</span>
          <div class="name">${this.ui.escapeHtml(cat.name || 'بدون نام')}</div>
          <div class="count">${cat.products?.length || 0} محصول</div>
        `;
                card.addEventListener('click', () => {
                    if (this.onCategoryClick) this.onCategoryClick(cat);
                });
                container.appendChild(card);
            });
        } catch (error) {
            console.error('❌ [ProductRenderer.renderCategories] خطا:', error);
        }
    }

    /**
     * رندر زیردسته‌ها
     */
    renderSubcategories(category, container, titleElement) {
        try {
            if (titleElement) {
                titleElement.innerHTML = `
          <span class="emoji">${this.ui.escapeHtml(category.emoji || '📂')}</span>
          ${this.ui.escapeHtml(category.name || 'دسته‌بندی')} - زیردسته‌ها
        `;
            }

            if (!container) return;
            container.innerHTML = '';

            const products = category.products || [];
            if (products.length === 0) {
                container.innerHTML = `
          <div style="text-align:center; padding:30px; color:var(--text-muted);">
            ⚠️ این دسته‌بندی محصولی ندارد
          </div>
        `;
                return;
            }

            // گروه‌بندی بر اساس نوع کلاس
            const groups = {};
            products.forEach((product) => {
                const key = product.constructor.name || 'سایر';
                if (!groups[key]) groups[key] = [];
                groups[key].push(product);
            });

            Object.keys(groups).forEach((groupName) => {
                const card = document.createElement('div');
                card.className = 'subcategory-card';
                const items = groups[groupName];
                card.innerHTML = `
          <span class="emoji">📦</span>
          <div class="name">${this.ui.escapeHtml(groupName)}</div>
          <div class="count">${items.length} محصول</div>
        `;
                card.addEventListener('click', () => {
                    if (this.onSubcategoryClick) this.onSubcategoryClick(items);
                });
                container.appendChild(card);
            });
        } catch (error) {
            console.error('❌ [ProductRenderer.renderSubcategories] خطا:', error);
        }
    }

    /**
     * رندر لیست محصولات
     */
    renderProducts(products, container) {
        try {
            if (!container) return;
            container.innerHTML = '';

            if (!products || products.length === 0) {
                container.innerHTML = `
          <div style="text-align:center; padding:40px; color:var(--text-muted); grid-column: 1/-1;">
            <div style="font-size: 48px;">🔍</div>
            <p>محصولی با این فیلتر پیدا نشد</p>
          </div>
        `;
                return;
            }

            products.forEach((product) => {
                const card = this._createProductCard(product);
                container.appendChild(card);
            });
        } catch (error) {
            console.error('❌ [ProductRenderer.renderProducts] خطا:', error);
        }
    }

    /**
     * ساخت کارت محصول
     * @private
     */
    _createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productCode = product.code;

        const imageHtml = product.hasImage?.()
            ? `<img class="product-image" src="${this.ui.escapeHtml(product.image)}" alt="${this.ui.escapeHtml(product.name)}" loading="lazy" onerror="this.style.display='none'">`
            : `<div class="product-image-placeholder">📷</div>`;

        const price = product.getFormattedPrice?.() || this.ui.formatPrice(product.price);
        const stockStatus = product.getStockStatus?.() || product.stockStatus?.label || 'نامشخص';
        const stockClass = product.getStockClass?.() || 'available';
        const stockEmoji = product.getStockEmoji?.() || '✅';
        const inCompare = this.comparisonService.hasProduct(product.code);

        card.innerHTML = `
      ${imageHtml}
      <div class="product-name">${this.ui.escapeHtml(product.name || 'بدون نام')}</div>
      <div class="product-price">${price} تومان</div>
      <span class="product-stock ${stockClass}">${stockEmoji} ${this.ui.escapeHtml(stockStatus)}</span>
      <div class="product-actions">
        <label class="compare-toggle" title="افزودن به مقایسه">
          <input type="checkbox" ${inCompare ? 'checked' : ''} data-action="toggle-compare">
          <span>⚖️</span>
        </label>
        <button type="button" class="share-btn" data-action="share" title="اشتراک‌گذاری">🔗</button>
      </div>
    `;

        // کلیک روی کارت
        card.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]')) return;
            if (this.onProductClick) this.onProductClick(product);
        });

        // چک باکس مقایسه
        const checkbox = card.querySelector('[data-action="toggle-compare"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (this.onToggleCompare) this.onToggleCompare(product);
            });
        }

        // دکمه اشتراک‌گذاری
        const shareBtn = card.querySelector('[data-action="share"]');
        if (shareBtn) {
            shareBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (this.onShare) this.onShare(product);
            });
        }

        return card;
    }

    /**
     * رندر جزئیات محصول
     */
    renderProductDetail(product, container) {
        try {
            if (!container) return;

            const price = product.getFormattedPrice?.() || this.ui.formatPrice(product.price);
            const inCompare = this.comparisonService.hasProduct(product.code);
            const social = this.shareService.getSocialLinks(product);

            container.innerHTML = `
        <div class="detail-header">
          ${product.hasImage?.()
                ? `<img class="detail-image" src="${this.ui.escapeHtml(product.image)}" alt="${this.ui.escapeHtml(product.name)}">`
                : `<div class="detail-image" style="display:flex; align-items:center; justify-content:center; font-size:64px; background:var(--bg-info);">📷</div>`
            }
          <div class="detail-info-right">
            <div class="detail-name">${this.ui.escapeHtml(product.name || 'بدون نام')}</div>
            <div class="detail-price">${price} تومان</div>
            <div class="detail-meta">
              <span class="meta-item"><strong>برند:</strong> ${this.ui.escapeHtml(product.brand?.label || product.brand?.value || 'نامشخص')}</span>
              <span class="meta-item"><strong>کد:</strong> ${this.ui.escapeHtml(product.code || 'نامشخص')}</span>
              <span class="meta-item"><strong>وضعیت:</strong> ${this.ui.escapeHtml(product.stockStatus?.label || 'نامشخص')}</span>
            </div>
            <div class="detail-actions">
              <button id="toggleCompareDetail" class="action-btn ${inCompare ? 'active' : ''}">
                ⚖️ ${inCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
              </button>
              <button id="copyLinkDetail" class="action-btn">🔗 کپی لینک</button>
              <a href="${social.telegram}" target="_blank" class="action-btn">📱 تلگرام</a>
              <a href="${social.whatsapp}" target="_blank" class="action-btn">💬 واتساپ</a>
            </div>
          </div>
        </div>
        <div class="detail-description">
          <strong>📝 توضیحات:</strong><br>
          ${this.ui.escapeHtml(product.description || 'توضیحی ثبت نشده است.')}
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="https://eitaa.com/sport_90_isfahan" target="_blank" class="order-btn">
            🛒 ثبت سفارش
          </a>
        </div>
      `;

            // bind detail actions
            const toggleBtn = container.querySelector('#toggleCompareDetail');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    if (this.onToggleCompare) {
                        this.onToggleCompare(product);
                        const nowInCompare = this.comparisonService.hasProduct(product.code);
                        toggleBtn.textContent = `⚖️ ${nowInCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}`;
                        toggleBtn.classList.toggle('active', nowInCompare);
                    }
                });
            }

            const copyBtn = container.querySelector('#copyLinkDetail');
            if (copyBtn) {
                copyBtn.addEventListener('click', async () => {
                    if (this.onShare) this.onShare(product);
                });
            }
        } catch (error) {
            console.error('❌ [ProductRenderer.renderProductDetail] خطا:', error);
        }
    }
}