/**
 * FilterService.js - سرویس فیلتر و مرتب‌سازی پیشرفته
 *
 * مسئولیت:
 *   - فیلتر محصولات بر اساس: برند، دسته‌بندی، موجودی، محدوده قیمت
 *   - مرتب‌سازی محصولات بر اساس: قیمت، نام، جدیدترین
 *   - ترکیب فیلتر و مرتب‌سازی
 *   - ذخیره state فیلتر در localStorage
 *
 * الگوها:
 *   - Strategy Pattern (استراتژی‌های مختلف فیلتر/مرتب‌سازی)
 *   - Single Responsibility
 *
 * اصل SOLID:
 *   - Open/Closed: افزودن فیلتر/مرتب جدید بدون تغییر کد موجود
 *   - Single Responsibility: فقط فیلتر و مرتب‌سازی
 */
class FilterService {
    /**
     * @constructor
     * @param {Object} [options]
     * @param {Function} [options.onFilterChange]
     * @param {Function} [options.onSortChange]
     */
    constructor(options = {}) {
        /** @type {Object} فیلترهای فعال */
        this.activeFilters = {
            brands: [],
            categories: [],
            stockStatuses: [],
            priceRange: { min: null, max: null },
        };

        /** @type {string} گزینه مرتب‌سازی فعال */
        this.sortOption = SortOption.NEWEST;

        this.onFilterChange = options.onFilterChange || null;
        this.onSortChange = options.onSortChange || null;

        // بازیابی state از localStorage
        this._restoreState();
    }

    /**
     * بازیابی state از localStorage
     * @private
     */
    _restoreState() {
        try {
            const saved = localStorage.getItem(StorageKeys.FILTERS);
            if (saved) {
                const state = JSON.parse(saved);
                if (state.filters) this.activeFilters = state.filters;
                if (state.sortOption) this.sortOption = state.sortOption;
            }
        } catch (error) {
            console.error('❌ [FilterService] خطا در بازیابی state:', error);
        }
    }

    /**
     * ذخیره state در localStorage
     * @private
     */
    _saveState() {
        try {
            const state = {
                filters: this.activeFilters,
                sortOption: this.sortOption,
            };
            localStorage.setItem(StorageKeys.FILTERS, JSON.stringify(state));
        } catch (error) {
            console.error('❌ [FilterService] خطا در ذخیره state:', error);
        }
    }

    /**
     * اعمال فیلترها روی لیست محصولات
     * @param {Array<Object>} products - لیست محصولات
     * @param {Object} [filtersOverride] - override فیلترها (اختیاری)
     * @returns {Array<Object>} لیست فیلتر شده
     */
    filter(products, filtersOverride = null) {
        try {
            if (!Array.isArray(products)) {
                throw new TypeError('products باید یک آرایه باشد');
            }

            const filters = filtersOverride || this.activeFilters;
            let result = [...products];

            // ۱. فیلتر برند
            if (filters.brands && filters.brands.length > 0) {
                result = result.filter((product) => {
                    const brandValue = this._getBrandValue(product);
                    return filters.brands.includes(brandValue);
                });
            }

            // ۲. فیلتر دسته‌بندی
            if (filters.categories && filters.categories.length > 0) {
                result = result.filter((product) => {
                    const catValue = this._getCategoryValue(product);
                    return filters.categories.includes(catValue);
                });
            }

            // ۳. فیلتر وضعیت موجودی
            if (filters.stockStatuses && filters.stockStatuses.length > 0) {
                result = result.filter((product) => {
                    const stockValue = this._getStockValue(product);
                    return filters.stockStatuses.includes(stockValue);
                });
            }

            // ۴. فیلتر محدوده قیمت
            if (filters.priceRange) {
                const { min, max } = filters.priceRange;
                if (min !== null && min !== '' && !isNaN(min)) {
                    result = result.filter((p) => Number(p.price) >= Number(min));
                }
                if (max !== null && max !== '' && !isNaN(max)) {
                    result = result.filter((p) => Number(p.price) <= Number(max));
                }
            }

            return result;
        } catch (error) {
            console.error('❌ [FilterService.filter] خطا:', error);
            return products;
        }
    }

    /**
     * مرتب‌سازی محصولات
     * @param {Array<Object>} products
     * @param {string} [sortOptionOverride]
     * @returns {Array<Object>}
     */
    sort(products, sortOptionOverride = null) {
        try {
            if (!Array.isArray(products)) {
                throw new TypeError('products باید یک آرایه باشد');
            }

            const option = sortOptionOverride || this.sortOption;
            const result = [...products];

            switch (option) {
                case SortOption.PRICE_ASC:
                    return result.sort((a, b) => Number(a.price) - Number(b.price));

                case SortOption.PRICE_DESC:
                    return result.sort((a, b) => Number(b.price) - Number(a.price));

                case SortOption.NAME_ASC:
                    return result.sort((a, b) =>
                        String(a.name).localeCompare(String(b.name), 'fa')
                    );

                case SortOption.NAME_DESC:
                    return result.sort((a, b) =>
                        String(b.name).localeCompare(String(a.name), 'fa')
                    );

                case SortOption.NEWEST:
                default:
                    return result.sort((a, b) => {
                        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        if (timeB !== timeA) return timeB - timeA;
                        return String(b.code || '').localeCompare(String(a.code || ''));
                    });
            }
        } catch (error) {
            console.error('❌ [FilterService.sort] خطا:', error);
            return products;
        }
    }

    /**
     * ترکیب فیلتر و مرتب‌سازی (روش اصلی)
     * @param {Array<Object>} products
     * @param {Object} [filtersOverride]
     * @param {string} [sortOptionOverride]
     * @returns {Array<Object>}
     */
    combine(products, filtersOverride = null, sortOptionOverride = null) {
        const filtered = this.filter(products, filtersOverride);
        return this.sort(filtered, sortOptionOverride);
    }

    /**
     * toggle یک فیلتر (اضافه/حذف)
     * @param {string} filterType - 'brands' | 'categories' | 'stockStatuses'
     * @param {*} value
     */
    toggleFilter(filterType, value) {
        try {
            if (!this.activeFilters[filterType]) {
                this.activeFilters[filterType] = [];
            }

            const arr = this.activeFilters[filterType];
            const index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            } else {
                arr.push(value);
            }

            this._saveState();
            eventBus.emit(AppEvents.FILTER_CHANGED, this.activeFilters);
            if (typeof this.onFilterChange === 'function') {
                this.onFilterChange(this.activeFilters);
            }
        } catch (error) {
            console.error('❌ [FilterService.toggleFilter] خطا:', error);
        }
    }

    /**
     * تنظیم محدوده قیمت
     * @param {number|string|null} min
     * @param {number|string|null} max
     */
    setPriceRange(min, max) {
        try {
            this.activeFilters.priceRange = {
                min: min === '' || min === null ? null : Number(min),
                max: max === '' || max === null ? null : Number(max),
            };
            this._saveState();
            eventBus.emit(AppEvents.FILTER_CHANGED, this.activeFilters);
            if (typeof this.onFilterChange === 'function') {
                this.onFilterChange(this.activeFilters);
            }
        } catch (error) {
            console.error('❌ [FilterService.setPriceRange] خطا:', error);
        }
    }

    /**
     * تنظیم گزینه مرتب‌سازی
     * @param {string} option
     */
    setSortOption(option) {
        try {
            if (!Object.values(SortOption).includes(option)) {
                throw new Error(`گزینه نامعتبر: ${option}`);
            }
            this.sortOption = option;
            this._saveState();
            eventBus.emit(AppEvents.SORT_CHANGED, this.sortOption);
            if (typeof this.onSortChange === 'function') {
                this.onSortChange(this.sortOption);
            }
        } catch (error) {
            console.error('❌ [FilterService.setSortOption] خطا:', error);
        }
    }

    /**
     * پاک کردن همه فیلترها
     */
    clearFilters() {
        try {
            this.activeFilters = {
                brands: [],
                categories: [],
                stockStatuses: [],
                priceRange: { min: null, max: null },
            };
            this._saveState();
            eventBus.emit(AppEvents.FILTER_CHANGED, this.activeFilters);
            if (typeof this.onFilterChange === 'function') {
                this.onFilterChange(this.activeFilters);
            }
        } catch (error) {
            console.error('❌ [FilterService.clearFilters] خطا:', error);
        }
    }

    /**
     * دریافت فیلترهای فعال
     * @returns {Object}
     */
    getActiveFilters() {
        return JSON.parse(JSON.stringify(this.activeFilters));
    }

    /**
     * دریافت گزینه مرتب‌سازی فعال
     * @returns {string}
     */
    getSortOption() {
        return this.sortOption;
    }

    /**
     * آیا فیلتری فعال است؟
     * @returns {boolean}
     */
    hasActiveFilters() {
        const f = this.activeFilters;
        return (
            f.brands.length > 0 ||
            f.categories.length > 0 ||
            f.stockStatuses.length > 0 ||
            f.priceRange.min !== null ||
            f.priceRange.max !== null
        );
    }

    // ===== helper های استخراج مقدار از محصول =====
    _getBrandValue(product) {
        return product.brand?.value || product.brand;
    }
    _getCategoryValue(product) {
        return product.category?.value || product.category;
    }
    _getStockValue(product) {
        return product.stockStatus?.value || product.stockStatus;
    }
}

if (typeof window !== 'undefined') { window.FilterService = FilterService; }
