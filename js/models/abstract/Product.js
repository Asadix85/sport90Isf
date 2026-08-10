/**
 * ============================================================
 *  کلاس Abstract Product - پایه همه محصولات
 * ============================================================
 */

class Product {
    constructor({
                    name,
                    price,
                    stockStatus = window.StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = window.Category.OTHER,
                    brand = window.Brand.OTHER,
                    colors = []
                }) {
        this.name = name;
        this.price = price;
        this.stockStatus = stockStatus;
        this.image = image;
        this.description = description || 'توضیحی برای این محصول ثبت نشده است.';
        this.category = category;
        this.brand = brand;
        this.colors = colors;

        this.code = this._generateCode();
        this.createdAt = new Date();
    }

    _generateCode() {
        return 'P' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
    }

    getFormattedPrice() {
        return new Intl.NumberFormat('fa-IR').format(this.price);
    }

    getStockStatus() {
        return this.stockStatus.label || this.stockStatus;
    }

    getStockClass() {
        if (this.stockStatus === window.StockStatus.AVAILABLE) return 'available';
        if (this.stockStatus === window.StockStatus.OUT_OF_STOCK) return 'unavailable';
        if (this.stockStatus === window.StockStatus.PRE_ORDER) return 'pre-order';
        return 'limited';
    }

    getStockEmoji() {
        return this.stockStatus.emoji || '❓';
    }

    // ===== این متدها باید وجود داشته باشند =====
    getCategoryName() {
        return this.category.label || this.category;
    }

    getCategoryEmoji() {
        return this.category.emoji || '📦';
    }
    // =========================================

    getBrandName() {
        return this.brand.label || this.brand;
    }

    getColors() {
        return this.colors.map(c => c.label || c);
    }

    hasImage() {
        return this.image && this.image.trim() !== '';
    }

    isInStock() {
        return this.stockStatus === window.StockStatus.AVAILABLE ||
            this.stockStatus === window.StockStatus.LIMITED;
    }

    toString() {
        return `${this.getCategoryEmoji()} ${this.name} - ${this.getFormattedPrice()} تومان`;
    }
}
window.Product = Product;
