/**
 * SearchService - سرویس جستجوی پیشرفته
 * مسئولیت: جستجو در محصولات بر اساس اسم و کد کالا
 */
class SearchService {
    constructor(dataService) {
        this.dataService = dataService;
    }

    /**
     * جستجوی اصلی - هم اسم و هم کد کالا رو بررسی میکنه
     * @param {string} query - عبارت جستجو
     * @returns {Array} - لیست محصولات پیدا شده
     */
    search(query) {
        if (!query || query.trim() === '') {
            return [];
        }

        const normalizedQuery = this._normalize(query.trim());
        const allProducts = this.dataService.getAllProducts();

        return allProducts.filter(product => {
            // جستجو در اسم محصول
            const nameMatch = this._searchInName(product, normalizedQuery);
            
            // جستجو در کد محصول
            const codeMatch = this._searchInCode(product, normalizedQuery);

            return nameMatch || codeMatch;
        });
    }

    /**
     * جستجو در اسم محصول
     */
    _searchInName(product, query) {
        const productName = this._normalize(product.name);
        return productName.includes(query);
    }

    /**
     * جستجو در کد محصول
     */
    _searchInCode(product, query) {
        if (!product.code) return false;
        const productCode = this._normalize(product.code);
        return productCode.includes(query);
    }

    /**
     * نرمال‌سازی متن (حذف فاصله‌های اضافی، تبدیل به حروف کوچک)
     */
    _normalize(text) {
        return text
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' ');  // حذف فاصله‌های اضافی
    }

    /**
     * جستجوی پیشرفته با فیلترهای بیشتر
     * @param {string} query - عبارت جستجو
     * @param {Object} filters - فیلترهای اضافی (دسته‌بندی، برند، قیمت)
     * @returns {Array} - لیست محصولات پیدا شده
     */
    searchAdvanced(query, filters = {}) {
        let results = this.search(query);

        // فیلتر بر اساس دسته‌بندی
        if (filters.category) {
            results = results.filter(p => 
                p.category && p.category.value === filters.category
            );
        }

        // فیلتر بر اساس برند
        if (filters.brand) {
            results = results.filter(p => 
                p.brand && p.brand.value === filters.brand
            );
        }

        // فیلتر بر اساس قیمت
        if (filters.minPrice !== undefined) {
            results = results.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            results = results.filter(p => p.price <= filters.maxPrice);
        }

        // فیلتر بر اساس موجودی
        if (filters.inStock !== undefined) {
            results = results.filter(p => p.isInStock() === filters.inStock);
        }

        return results;
    }

    /**
     * جستجوی سریع با پیشنهادات
     * @param {string} query - عبارت جستجو
     * @param {number} limit - تعداد نتایج محدود (پیشنهادات)
     * @returns {Array} - لیست محدود از نتایج
     */
    searchSuggestions(query, limit = 5) {
        const results = this.search(query);
        return results.slice(0, limit);
    }
}