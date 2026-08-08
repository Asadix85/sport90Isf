/**
 * AutocompleteService.js - سرویس تکمیل خودکار جستجو
 *
 * مسئولیت:
 *   - ارائه پیشنهادات جستجو (ranked)
 *   - ذخیره تاریخچه جستجو
 *
 * الگو: Strategy Pattern برای ranking
 */
class AutocompleteService {
    /**
     * @constructor
     */
    constructor() {
        this.storageKey = StorageKeys.SEARCH_HISTORY;
        this.maxHistory = AppLimits.MAX_SEARCH_HISTORY;
        this.maxSuggestions = AppLimits.MAX_SUGGESTIONS;
    }

    /**
     * دریافت پیشنهادات
     * @param {string} query
     * @param {Array<Object>} products
     * @param {number} [limit]
     * @returns {Array<Object>}
     */
    getSuggestions(query, products, limit = null) {
        try {
            const q = (query || '').trim().toLowerCase();
            if (q.length < 1 || !Array.isArray(products)) return [];

            const max = limit || this.maxSuggestions;

            return products
                .map((product) => ({
                    product,
                    score: this._scoreProduct(product, q),
                }))
                .filter((item) => item.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, max)
                .map((item) => ({
                    code: item.product.code,
                    name: item.product.name,
                    brand: item.product.brand,
                    price: item.product.price,
                    category: item.product.category,
                    stockStatus: item.product.stockStatus,
                    image: item.product.image,
                    score: item.score,
                }));
        } catch (error) {
            console.error('❌ [AutocompleteService.getSuggestions] خطا:', error);
            return [];
        }
    }

    /**
     * امتیازدهی به محصول
     * @private
     * @param {Object} product
     * @param {string} query - lowercased
     * @returns {number}
     */
    _scoreProduct(product, query) {
        const name = String(product.name || '').toLowerCase();
        const code = String(product.code || '').toLowerCase();
        const brand = String(product.brand?.label || product.brand || '').toLowerCase();

        // اولویت‌ها:
        // 1. تطابق دقیق کد = 100
        if (code === query) return 100;
        // 2. اسم با query شروع شود = 90
        if (name.startsWith(query)) return 90;
        // 3. کد با query شروع شود = 80
        if (code.startsWith(query)) return 80;
        // 4. اسم شامل query باشد = 70
        if (name.includes(query)) return 70;
        // 5. برند شامل query باشد = 50
        if (brand && brand.includes(query)) return 50;
        // 6. کد شامل query باشد = 40
        if (code.includes(query)) return 40;

        return 0;
    }

    /**
     * افزودن به تاریخچه جستجو
     * @param {string} query
     */
    addToHistory(query) {
        try {
            const trimmed = (query || '').trim();
            if (!trimmed) return;

            const history = this.getHistory();
            // حذف تکراری و افزودن به ابتدا
            const filtered = history.filter((item) => item !== trimmed);
            filtered.unshift(trimmed);

            const limited = filtered.slice(0, this.maxHistory);
            localStorage.setItem(this.storageKey, JSON.stringify(limited));
        } catch (error) {
            console.error('❌ [AutocompleteService.addToHistory] خطا:', error);
        }
    }

    /**
     * دریافت تاریخچه جستجو
     * @returns {Array<string>}
     */
    getHistory() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return [];
            const data = JSON.parse(stored);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('❌ [AutocompleteService.getHistory] خطا:', error);
            return [];
        }
    }

    /**
     * حذف از تاریخچه
     * @param {string} query
     */
    removeFromHistory(query) {
        try {
            const history = this.getHistory().filter((q) => q !== query);
            localStorage.setItem(this.storageKey, JSON.stringify(history));
        } catch (error) {
            console.error('❌ [AutocompleteService.removeFromHistory] خطا:', error);
        }
    }

    /**
     * پاک کردن تاریخچه
     */
    clearHistory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        } catch (error) {
            console.error('❌ [AutocompleteService.clearHistory] خطا:', error);
        }
    }
}