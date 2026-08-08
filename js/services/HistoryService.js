/**
 * HistoryService.js - سرویس تاریخچه مشاهده محصولات
 *
 * مسئولیت:
 *   - ذخیره آخرین محصولات مشاهده شده (max 10)
 *   - ذخیره در localStorage
 *   - انتشار رویداد تغییر
 *
 * الگو: Singleton + Observer
 */
class HistoryService {
    /**
     * @constructor
     */
    constructor() {
        if (HistoryService._instance) {
            return HistoryService._instance;
        }

        /** @type {Array<Object>} */
        this.history = [];
        this.maxItems = AppLimits.MAX_HISTORY;
        this.storageKey = StorageKeys.HISTORY;

        this._restoreFromStorage();
        HistoryService._instance = this;
    }

    /**
     * @returns {HistoryService}
     */
    static getInstance() {
        if (!HistoryService._instance) {
            new HistoryService();
        }
        return HistoryService._instance;
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
                    this.history = data.slice(0, this.maxItems);
                }
            }
        } catch (error) {
            console.error('❌ [HistoryService] خطا در بازیابی:', error);
            this.history = [];
        }
    }

    /**
     * ذخیره در localStorage
     * @private
     */
    _saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.history));
        } catch (error) {
            console.error('❌ [HistoryService] خطا در ذخیره:', error);
        }
    }

    /**
     * انتشار رویداد
     * @private
     */
    _notify() {
        eventBus.emit(AppEvents.HISTORY_CHANGED, {
            items: this.getAll(),
            count: this.history.length,
        });
    }

    /**
     * افزودن محصول به تاریخچه
     * محصول تکراری به ابتدای لیست منتقل می‌شود
     * @param {Object} product
     * @returns {{success: boolean, message: string}}
     */
    add(product) {
        try {
            if (!product || !product.code) {
                return { success: false, message: 'محصول معتبر نیست' };
            }

            // حذف از لیست اگر قبلاً هست
            this.history = this.history.filter((p) => p.code !== product.code);

            // ساخت snapshot و افزودن به ابتدای لیست
            const snapshot = {
                code: product.code,
                name: product.name,
                price: product.price,
                brand: product.brand,
                category: product.category,
                stockStatus: product.stockStatus,
                image: product.image || null,
                viewedAt: new Date().toISOString(),
            };

            this.history.unshift(snapshot);

            // محدود کردن تعداد
            if (this.history.length > this.maxItems) {
                this.history = this.history.slice(0, this.maxItems);
            }

            this._saveToStorage();
            this._notify();

            return { success: true, message: 'محصول به تاریخچه اضافه شد' };
        } catch (error) {
            console.error('❌ [HistoryService.add] خطا:', error);
            return { success: false, message: 'خطای داخلی' };
        }
    }

    /**
     * دریافت همه تاریخچه
     * @returns {Array<Object>}
     */
    getAll() {
        return [...this.history];
    }

    /**
     * دریافت N محصول آخر مشاهده شده
     * @param {number} [limit=5]
     * @returns {Array<Object>}
     */
    getLastViewed(limit = 5) {
        return this.history.slice(0, limit);
    }

    /**
     * حذف یک محصول از تاریخچه
     * @param {string} productCode
     */
    remove(productCode) {
        try {
            const before = this.history.length;
            this.history = this.history.filter((p) => p.code !== productCode);
            if (this.history.length !== before) {
                this._saveToStorage();
                this._notify();
            }
        } catch (error) {
            console.error('❌ [HistoryService.remove] خطا:', error);
        }
    }

    /**
     * پاک کردن کل تاریخچه
     */
    clear() {
        try {
            if (this.history.length === 0) return;
            this.history = [];
            this._saveToStorage();
            this._notify();
        } catch (error) {
            console.error('❌ [HistoryService.clear] خطا:', error);
        }
    }

    /**
     * تعداد آیتم‌های فعلی
     * @returns {number}
     */
    getCount() {
        return this.history.length;
    }
}export { HistoryService };
