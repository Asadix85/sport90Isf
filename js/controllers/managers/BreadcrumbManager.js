/**
 * BreadcrumbManager.js - مدیریت مسیر ناوبری
 * مسئولیت: نمایش breadcrumb و مدیریت مسیر
 */
class BreadcrumbManager {
    constructor() {
        this.container = null;
        this.path = [];
        this.onNavigate = null;
    }

    init() {
        this._createContainer();
        this._render();
    }

    _createContainer() {
        const searchSection = document.querySelector('.search-section');
        if (!searchSection) return;

        const breadcrumbHtml = `
      <nav class="breadcrumb-container" id="breadcrumb" aria-label="مسیر">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <a href="#" data-page="main" class="breadcrumb-link">🏠 خانه</a>
          </li>
        </ol>
      </nav>
    `;
        searchSection.insertAdjacentHTML('afterend', breadcrumbHtml);
        this.container = document.getElementById('breadcrumb');

        // Event listener
        if (this.container) {
            this.container.addEventListener('click', (e) => {
                const link = e.target.closest('.breadcrumb-link');
                if (link) {
                    e.preventDefault();
                    const page = link.dataset.page;
                    if (this.onNavigate) this.onNavigate(page, link.dataset.index);
                }
            });
        }
    }

    /**
     * تنظیم مسیر
     * @param {Array<{label: string, page: string}>} items
     */
    setPath(items) {
        this.path = items || [];
        this._render();
    }

    /**
     * افزودن به مسیر
     */
    push(label, page) {
        this.path.push({ label, page });
        this._render();
    }

    /**
     * حذف آخرین آیتم
     */
    pop() {
        this.path.pop();
        this._render();
    }

    /**
     * پاک کردن مسیر (فقط خانه)
     */
    reset() {
        this.path = [];
        this._render();
    }

    _render() {
        if (!this.container) return;

        const list = this.container.querySelector('.breadcrumb-list');
        if (!list) return;

        let html = `
      <li class="breadcrumb-item">
        <a href="#" data-page="main" class="breadcrumb-link">🏠 خانه</a>
      </li>
    `;

        this.path.forEach((item, index) => {
            const isLast = index === this.path.length - 1;
            html += `
        <li class="breadcrumb-item">
          <span class="breadcrumb-separator">‹</span>
          ${isLast
                ? `<span class="breadcrumb-current">${item.label}</span>`
                : `<a href="#" data-page="${item.page}" data-index="${index}" class="breadcrumb-link">${item.label}</a>`
            }
        </li>
      `;
        });

        list.innerHTML = html;
    }

    /**
     * به‌روزرسانی بر اساس state فعلی
     */
    updateFromState(currentCategory, currentSubcategory, currentProduct) {
        const path = [];

        if (currentCategory) {
            path.push({ label: currentCategory.name || 'دسته‌بندی', page: 'sub' });
        }

        if (currentSubcategory) {
            path.push({ label: 'لیست محصولات', page: 'products' });
        }

        if (currentProduct) {
            path.push({ label: currentProduct.name || 'جزئیات', page: 'detail' });
        }

        this.setPath(path);
    }
}


if (typeof window !== 'undefined') { window.BreadcrumbManager = BreadcrumbManager; }
