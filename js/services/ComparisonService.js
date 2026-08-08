/**
 * ComparisonService.js - سرویس مقایسه محصولات
 *
 * مسئولیت:
 *   - مدیریت لیست محصولات در حال مقایسه (حداکثر 3)
 *   - ذخیره در localStorage
 *   - محاسبه تفاوت‌ها
 *   - انتشار رویداد تغییرات
 *
 * الگوها: Singleton + Observer
 * SOLID: Single Responsibility
 */
class ComparisonService {
    /**
     * @constructor
     */
    constructor() {
        if (ComparisonService._instance) {
            return ComparisonService._instance;
        }

        /** @type {Array<Object>} محصولات مقایسه */
        this.comparedProducts = [];
        this.maxItems = AppLimits.MAX_COMPARISON;
        this.storageKey = StorageKeys.COMPARISON;

        this._restoreFromStorage();
        ComparisonService._instance = this;
    }

    /**
     * Singleton instance
     * @returns {ComparisonService}
     */
    static getInstance() {
        if (!ComparisonService._instance) {
            new ComparisonService();
        }
        return ComparisonService._instance;
    }

    /**
     * بازیابی از localStorage
     * @private
     */
    _restoreFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                if (Array.isArray(data)) {
                    this.comparedProducts = data.slice(0, this.maxItems);
                }
            }
        } catch (error) {
            console.error('❌ [ComparisonService] خطا در بازیابی:', error);
            this.comparedProducts = [];
        }
    }

    /**
     * ذخیره در localStorage
     * @private
     */
    _saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.comparedProducts));
        } catch (error) {
            console.error('❌ [ComparisonService] خطا در ذخیره:', error);
        }
    }

    /**
     * انتشار رویداد تغییر
     * @private
     */
    _notify() {
        eventBus.emit(AppEvents.COMPARISON_CHANGED, {
            items: this.getComparison(),
            count: this.comparedProducts.length,
            maxItems: this.maxItems,
        });
    }

    /**
     * افزودن محصول به مقایسه
     * @param {Object} product
     * @returns {{success: boolean, message: string}}
     */
    addProduct(product) {
        try {
            if (!product || !product.code) {
                return { success: false, message: 'محصول معتبر نیست' };
            }

            // بررسی تکراری
            if (this.hasProduct(product.code)) {
                return { success: false, message: 'این محصول قبلاً اضافه شده' };
            }

            // بررسی حداکثر تعداد
            if (this.isFull()) {
                return {
                    success: false,
                    message: `حداکثر ${this.maxItems} محصول قابل مقایسه است`,
                };
            }

            // ذخیره snapshot ساده (نه instance کلاس)
            const snapshot = this._createSnapshot(product);
            this.comparedProducts.push(snapshot);
            this._saveToStorage();
            this._notify();

            return { success: true, message: 'محصول به مقایسه اضافه شد' };
        } catch (error) {
            console.error('❌ [ComparisonService.addProduct] خطا:', error);
            return { success: false, message: 'خطای داخلی' };
        }
    }

    /**
     * toggle محصول (اضافه یا حذف)
     * @param {Object} product
     * @returns {{success: boolean, message: string}}
     */
    toggleProduct(product) {
        if (this.hasProduct(product.code)) {
            return this.removeProduct(product.code);
        } else {
            return this.addProduct(product);
        }
    }

    /**
     * حذف محصول
     * @param {string} productCode
     * @returns {{success: boolean, message: string}}
     */
    removeProduct(productCode) {
        try {
            const before = this.comparedProducts.length;
            this.comparedProducts = this.comparedProducts.filter(
                (p) => p.code !== productCode
            );
            const removed = this.comparedProducts.length < before;

            if (removed) {
                this._saveToStorage();
                this._notify();
                return { success: true, message: 'محصول از مقایسه حذف شد' };
            }
            return { success: false, message: 'محصول در لیست نیست' };
        } catch (error) {
            console.error('❌ [ComparisonService.removeProduct] خطا:', error);
            return { success: false, message: 'خطای داخلی' };
        }
    }

    /**
     * دریافت لیست مقایسه
     * @returns {Array<Object>}
     */
    getComparison() {
        return [...this.comparedProducts];
    }

    /**
     * بررسی وجود محصول
     * @param {string} productCode
     * @returns {boolean}
     */
    hasProduct(productCode) {
        return this.comparedProducts.some((p) => p.code === productCode);
    }

    /**
     * آیا لیست پر است؟
     * @returns {boolean}
     */
    isFull() {
        return this.comparedProducts.length >= this.maxItems;
    }

    /**
     * تعداد محصولات فعلی
     * @returns {number}
     */
    getCount() {
        return this.comparedProducts.length;
    }

    /**
     * محاسبه تفاوت‌ها بین محصولات مقایسه
     * @param {Array<string>} [fields]
     * @returns {Object}
     */
    getDifferences(fields = ['price', 'brand', 'category', 'stockStatus']) {
        const result = {};
        try {
            if (this.comparedProducts.length < 2) return result;

            fields.forEach((field) => {
                const values = new Set(
                    this.comparedProducts.map((p) => this._formatValue(p, field))
                );
                result[field] = values.size > 1;
            });
        } catch (error) {
            console.error('❌ [ComparisonService.getDifferences] خطا:', error);
        }
        return result;
    }

    /**
     * پاک کردن همه
     */
    clear() {
        try {
            if (this.comparedProducts.length === 0) return;
            this.comparedProducts = [];
            this._saveToStorage();
            this._notify();
        } catch (error) {
            console.error('❌ [ComparisonService.clear] خطا:', error);
        }
    }

    /**
     * ساخت snapshot ساده از محصول
     * @private
     * @param {Object} product
     * @returns {Object}
     */
    _createSnapshot(product) {
        return {
            code: product.code,
            name: product.name,
            price: product.price,
            brand: product.brand,
            category: product.category,
            stockStatus: product.stockStatus,
            image: product.image || null,
            description: product.description || '',
            weight: product.weight || null,
            colors: product.colors || [],
            gender: product.gender || null,
        };
    }

    /**
     * فرمت مقدار برای مقایسه
     * @private
     */
    _formatValue(product, field) {
        const value = product[field];
        if (value && typeof value === 'object' && value.value !== undefined) {
            return value.value;
        }
        return String(value ?? '');
    }
}