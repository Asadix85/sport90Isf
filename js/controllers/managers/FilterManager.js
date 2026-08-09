/**
 * FilterManager.js - مدیریت فیلترها و drawer
 * مسئولیت: filter drawer, checkboxes, price range, sort
 */
class FilterManager {
    constructor(filterService, uiManager) {
        this.filterService = filterService;
        this.ui = uiManager;
        this.elements = {};
        this.onFiltersApplied = null; // callback
    }

    init() {
        this.elements = {
            drawer: document.getElementById('filterDrawer'),
            toggleBtn: document.getElementById('toggleFilterBtn'),
            closeBtn: document.getElementById('closeFilterDrawer'),
            applyBtn: document.getElementById('applyFilters'),
            clearBtn: document.getElementById('clearFilters'),
            brandFilters: document.getElementById('brandFilters'),
            categoryFilters: document.getElementById('categoryFilters'),
            stockFilters: document.getElementById('stockFilters'),
            priceMin: document.getElementById('priceMin'),
            priceMax: document.getElementById('priceMax'),
            sortSelect: document.getElementById('sortSelect'),
            resultCount: document.getElementById('resultCount'),
            filterBadge: document.getElementById('filterBadge'),
        };

        this._renderOptions();
        this._bindEvents();
        this._syncUI();
    }

    _renderOptions() {
        try {
            const { brandFilters, categoryFilters, stockFilters } = this.elements;

            // برندها - فقط برندهای معتبر
            if (brandFilters) {
                const validBrands = Object.values(Brand).filter(b =>
                    b.value !== 'other' && b.value !== 'iranian' && b.value !== 'imported'
                );

                // دسته‌بندی برندها
                const international = validBrands.filter(b => b.type === 'international');
                const sports = validBrands.filter(b => b.type === 'sports');
                const iranian = validBrands.filter(b => b.type === 'iranian');

                brandFilters.innerHTML = `
        <div class="filter-group-label">🌍 بین‌المللی</div>
        ${international.map((b) => `
          <label class="filter-check">
            <input type="checkbox" value="${this.ui.escapeHtml(b.value)}" data-filter="brand">
            <span>${this.ui.escapeHtml(b.label)}</span>
          </label>
        `).join('')}
        
        <div class="filter-group-label">⚽ تخصصی ورزشی</div>
        ${sports.map((b) => `
          <label class="filter-check">
            <input type="checkbox" value="${this.ui.escapeHtml(b.value)}" data-filter="brand">
            <span>${this.ui.escapeHtml(b.label)}</span>
          </label>
        `).join('')}
        
        <div class="filter-group-label">🇮🇷 ایرانی</div>
        ${iranian.map((b) => `
          <label class="filter-check">
            <input type="checkbox" value="${this.ui.escapeHtml(b.value)}" data-filter="brand">
            <span>${this.ui.escapeHtml(b.label)}</span>
          </label>
        `).join('')}
      `;
            }
// دسته‌بندی‌ها
            if (categoryFilters) {
                categoryFilters.innerHTML = Object.values(Category)
                    .map((c) => `
            <label class="filter-check">
              <input type="checkbox" value="${this.ui.escapeHtml(c.value)}" data-filter="category">
              <span>${this.ui.escapeHtml(c.emoji)} ${this.ui.escapeHtml(c.label)}</span>
            </label>
          `)
                    .join('');
            }

            // موجودی
            if (stockFilters) {
                stockFilters.innerHTML = Object.values(StockStatus)
                    .map((s) => `
            <label class="filter-check">
              <input type="checkbox" value="${this.ui.escapeHtml(s.value)}" data-filter="stock">
              <span>${this.ui.escapeHtml(s.emoji)} ${this.ui.escapeHtml(s.label)}</span>
            </label>
          `)
                    .join('');
            }
        } catch (error) {
            console.error('❌ [FilterManager._renderOptions] خطا:', error);
        }
    }

    _bindEvents() {
        try {
            const { drawer, toggleBtn, closeBtn, applyBtn, clearBtn, priceMin, priceMax, sortSelect } = this.elements;
            if (!drawer) return;

            // باز کردن drawer
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.openDrawer());
            }

            // بستن drawer
            const closeDrawer = () => this.closeDrawer();

            if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
            if (applyBtn) applyBtn.addEventListener('click', closeDrawer);

            drawer.addEventListener('click', (e) => {
                if (e.target === drawer) closeDrawer();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
            });

            // تغییر چک‌باکس‌ها
            drawer.addEventListener('change', (e) => {
                const input = e.target;
                if (input.matches('input[data-filter="brand"]')) {
                    this.filterService.toggleFilter('brands', input.value);
                } else if (input.matches('input[data-filter="category"]')) {
                    this.filterService.toggleFilter('categories', input.value);
                } else if (input.matches('input[data-filter="stock"]')) {
                    this.filterService.toggleFilter('stockStatuses', input.value);
                }
                if (this.onFiltersApplied) this.onFiltersApplied();
            });

            // قیمت
            const debouncedPrice = debounce(() => {
                this.filterService.setPriceRange(priceMin?.value, priceMax?.value);
                if (this.onFiltersApplied) this.onFiltersApplied();
            }, 500);

            if (priceMin) priceMin.addEventListener('input', debouncedPrice);
            if (priceMax) priceMax.addEventListener('input', debouncedPrice);

            // مرتب‌سازی
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    this.filterService.setSortOption(e.target.value);
                    if (this.onFiltersApplied) this.onFiltersApplied();
                });
            }

            // پاک کردن
            if (clearBtn) {
                clearBtn.addEventListener('click', () => this.clearFilters());
            }
        } catch (error) {
            console.error('❌ [FilterManager._bindEvents] خطا:', error);
        }
    }

    openDrawer() {
        const { drawer } = this.elements;
        if (drawer) {
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    closeDrawer() {
        const { drawer } = this.elements;
        if (drawer) {
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    clearFilters() {
        try {
            this.filterService.clearFilters();
            const { priceMin, priceMax, drawer } = this.elements;
            if (priceMin) priceMin.value = '';
            if (priceMax) priceMax.value = '';
            if (drawer) {
                drawer.querySelectorAll('input[type="checkbox"]').forEach((c) => {
                    c.checked = false;
                });
            }
            if (this.onFiltersApplied) this.onFiltersApplied();
        } catch (error) {
            console.error('❌ [FilterManager.clearFilters] خطا:', error);
        }
    }

    updateResultCount(count) {
        if (this.elements.resultCount) {
            this.elements.resultCount.textContent = count;
        }
        this._updateBadge();
    }

    _updateBadge() {
        try {
            const { filterBadge } = this.elements;
            if (!filterBadge) return;

            const filters = this.filterService.getActiveFilters();
            let count = filters.brands.length + filters.categories.length + filters.stockStatuses.length;
            if (filters.priceRange.min !== null) count++;
            if (filters.priceRange.max !== null) count++;

            if (count > 0) {
                filterBadge.style.display = 'inline-block';
                filterBadge.textContent = count;
            } else {
                filterBadge.style.display = 'none';
            }
        } catch (error) {
            console.error('❌ [FilterManager._updateBadge] خطا:', error);
        }
    }

    _syncUI() {
        try {
            const filters = this.filterService.getActiveFilters();
            const { drawer, priceMin, priceMax, sortSelect } = this.elements;
            if (!drawer) return;

            drawer.querySelectorAll('input[data-filter="brand"]').forEach((c) => {
                c.checked = filters.brands.includes(c.value);
            });
            drawer.querySelectorAll('input[data-filter="category"]').forEach((c) => {
                c.checked = filters.categories.includes(c.value);
            });
            drawer.querySelectorAll('input[data-filter="stock"]').forEach((c) => {
                c.checked = filters.stockStatuses.includes(c.value);
            });

            if (priceMin) priceMin.value = filters.priceRange.min ?? '';
            if (priceMax) priceMax.value = filters.priceRange.max ?? '';
            if (sortSelect) sortSelect.value = this.filterService.getSortOption();

            this._updateBadge();
        } catch (error) {
            console.error('❌ [FilterManager._syncUI] خطا:', error);
        }
    }
}


if (typeof window !== 'undefined') { window.FilterManager = FilterManager; }
