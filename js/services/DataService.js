/**
 * DataService.js - مدیریت داده‌های محصولات
 * ------------------------------------------------------------------
 * محصولات دیگه داخل همین فایل هاردکد نیستن؛ همه از فایل
 * data/products.json خونده می‌شن. برای اضافه/ادیت/حذف محصول کافیه
 * همون فایل JSON (یا اکسل، از طریق admin.html) ویرایش بشه —
 * نیازی به تغییر این فایل یا هیچ فایل دیگه‌ای نیست.
 */

class DataService {
    constructor() {
        this.products = [];
        this.categories = {};
    }

    /**
     * بارگذاری محصولات از data/products.json
     * حتماً باید قبل از استفاده از سرویس await بشه.
     */
    async init() {
        try {
            const response = await fetch('data/products.json', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`دریافت products.json ناموفق بود (HTTP ${response.status})`);
            }
            const rows = await response.json();
            this.products = window.ProductFactory.createProductList(rows);
            console.log(`✅ ${this.products.length} محصول از products.json بارگذاری شد`);
        } catch (error) {
            console.error('❌ خطا در بارگذاری products.json:', error);
            this.products = [];
        }

        this._organizeByCategory();
        return this;
    }

    _organizeByCategory() {
        this.categories = {};

        this.products.forEach(product => {
            if (!product || !product.category) {
                return;
            }

            const key = product.category.value;
            if (!this.categories[key]) {
                this.categories[key] = {
                    name: product.getCategoryName ? product.getCategoryName() : product.category.label,
                    emoji: product.getCategoryEmoji ? product.getCategoryEmoji() : (product.category.emoji || '📦'),
                    products: []
                };
            }
            this.categories[key].products.push(product);
        });
    }

    getAllProducts() {
        return this.products;
    }

    getCategories() {
        return Object.values(this.categories);
    }

    getProductsByCategory(categoryValue) {
        return this.categories[categoryValue]?.products || [];
    }

    addProduct(product) {
        this.products.push(product);
        this._organizeByCategory();
    }
}

window.DataService = DataService;
