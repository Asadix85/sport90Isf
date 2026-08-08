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
    /**
     * ساخت کارت محصول (نسخه کامل و نهایی)
     * @private
     * @param {Object} product - محصول
     * @returns {HTMLElement} - کارت محصول
     */
    /**
     * ساخت کارت محصول (نسخه نهایی - اصلاح‌شده)
     * @private
     * @param {Object} product
     * @returns {HTMLElement}
     */
    _createProductCard(product) {
        try {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.productCode = product.code;

            // ===== ۱. تصویر =====
            let imageHtml;
            if (product.hasImage?.()) {
                imageHtml = `
        <div class="product-image-wrapper">
          <img 
            class="product-image" 
            data-src="${this.ui.escapeHtml(product.image)}"
            src="images/placeholders/loading.svg"
            alt="${this.ui.escapeHtml(product.name)}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='images/placeholders/no-image.png'; this.classList.add('loaded');"
          >
        </div>
      `;
            } else {
                const placeholder = this._getPlaceholderEmoji(product.category);
                imageHtml = `
        <div class="product-image-wrapper">
          <div class="product-image-placeholder">
            <span class="placeholder-emoji">${placeholder}</span>
          </div>
        </div>
      `;
            }

            // ===== ۲. اطلاعات =====
            const name = this.ui.escapeHtml(product.name || 'بدون نام');
            const price = product.getFormattedPrice?.() || this.ui.formatPrice(product.price);
            const stockStatus = product.getStockStatus?.() || product.stockStatus?.label || 'نامشخص';
            const stockClass = product.getStockClass?.() || 'available';
            const stockEmoji = product.getStockEmoji?.() || '✅';
            const inCompare = this.comparisonService.hasProduct(product.code);
            const brandHtml = this._createBrandBadge(product.brand);

            // ===== ۳. HTML نهایی =====
            card.innerHTML = `
      ${imageHtml}

      <div class="product-content">
        <div class="product-name" title="${name}">${name}</div>
        ${brandHtml}
        <span class="product-stock ${stockClass}">${stockEmoji} ${this.ui.escapeHtml(stockStatus)}</span>
        <div class="product-price">${price} <span class="price-unit">تومان</span></div>
      </div>

      <div class="product-actions">
        <button type="button" 
                class="action-icon-btn ${inCompare ? 'active' : ''}" 
                data-action="toggle-compare" 
                aria-pressed="${inCompare}"
                title="${inCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}">⚖️</button>

        <button type="button" class="action-icon-btn" data-action="quickview" title="مشاهده سریع">👁️</button>

        <button type="button" class="action-icon-btn" data-action="share" title="اشتراک‌گذاری">🔗</button>
      </div>
    `;

            // ===== ۴. Event Listeners =====

            // کلیک روی کارت = جزئیات
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-action]')) return;
                if (this.onProductClick) this.onProductClick(product);
            });

            // دکمه مقایسه (بدون checkbox - دکمه ساده)
            const compareBtn = card.querySelector('[data-action="toggle-compare"]');
            if (compareBtn) {
                compareBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.onToggleCompare) this.onToggleCompare(product);

                    // به‌روزرسانی ظاهر دکمه
                    const nowIn = this.comparisonService.hasProduct(product.code);
                    compareBtn.classList.toggle('active', nowIn);
                    compareBtn.setAttribute('aria-pressed', String(nowIn));
                    compareBtn.title = nowIn ? 'حذف از مقایسه' : 'افزودن به مقایسه';
                });
            }

            // دکمه Quick View
            const quickviewBtn = card.querySelector('[data-action="quickview"]');
            if (quickviewBtn) {
                quickviewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.onQuickView) this.onQuickView(product);
                });
            }

            // دکمه اشتراک
            const shareBtn = card.querySelector('[data-action="share"]');
            if (shareBtn) {
                shareBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.onShare) this.onShare(product);
                });
            }

            // Lazy Loading تصویر
            const img = card.querySelector('.product-image[data-src]');
            if (img && this.onImageLoad) {
                this.onImageLoad(img);
            }

            return card;
        } catch (error) {
            console.error('❌ [ProductRenderer._createProductCard] خطا:', error);
            const errorCard = document.createElement('div');
            errorCard.className = 'product-card';
            errorCard.innerHTML = `
      <div class="product-image-wrapper">
        <div class="product-image-placeholder"><span class="placeholder-emoji">⚠️</span></div>
      </div>
      <div class="product-content">
        <div class="product-name">خطا در نمایش محصول</div>
      </div>
    `;
            return errorCard;
        }
    }

    /**
     * ساخت Badge برند با دسته‌بندی
     * @private
     * @param {Object} brand - برند محصول
     * @returns {string} - HTML badge
     */
    _createBrandBadge(brand) {
        if (!brand) {
            return `<span class="brand-badge">🏷️ متفرقه</span>`;
        }

        const label = this.ui.escapeHtml(brand.label || brand.value || 'نامشخص');
        const type = brand.type || 'other';

        const badges = {
            international: {
                icon: '🌍',
                class: 'international',
                title: 'برند بین‌المللی'
            },
            sports: {
                icon: '⚽',
                class: 'sports',
                title: 'برند تخصصی ورزشی'
            },
            iranian: {
                icon: '🇮🇷',
                class: 'iranian',
                title: 'برند ایرانی'
            },
            other: {
                icon: '🏷️',
                class: 'other',
                title: 'سایر برندها'
            }
        };

        const badge = badges[type] || badges.other;

        return `
    <span class="brand-badge ${badge.class}" title="${badge.title}">
      ${badge.icon} ${label}
    </span>
  `;
    }

    /**
     * دریافت ایموجی placeholder بر اساس دسته‌بندی
     * @private
     * @param {Object|string} category - دسته‌بندی
     * @returns {string} - ایموجی
     */
    _getPlaceholderEmoji(category) {
        const catValue = category?.value || category || 'other';

        const placeholders = {
            // توپ‌ها
            'football_ball': '⚽',
            'basketball_ball': '🏀',
            'volleyball_ball': '🏐',
            'handball_ball': '🤾',
            'exercise_ball': '🏋️',
            'ping_pong': '🏓',
            'tennis_ball': '🎾',

            // کفش‌ها
            'football_shoe': '👟',
            'volleyball_shoe': '👟',
            'wrestling_shoe': '👟',
            'sports_shoe': '👟',

            // پوشاک
            'clothing': '👕',
            'martial_arts': '🥋',
            'swimming': '🏊',

            // تجهیزات
            'fitness': '💪',
            'dumbbell': '🏋️',
            'gloves': '🧤',
            'bands': '🔄',
            'accessories': '🔧',
            'nets': '🥅',
            'racket': '🏸',

            // پیش‌فرض
            'other': '📦',
            'decorative': '✨',
        };

        return placeholders[catValue] || '📦';
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
}export { ProductRenderer };
