/**
 * کلاس Abstract Product - پایه همه محصولات
 */
class Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = Category.OTHER,
                    brand = Brand.IRANIAN,
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
        if (this.stockStatus === StockStatus.AVAILABLE) return 'available';
        if (this.stockStatus === StockStatus.OUT_OF_STOCK) return 'unavailable';
        if (this.stockStatus === StockStatus.PRE_ORDER) return 'pre-order';
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
        return this.stockStatus === StockStatus.AVAILABLE ||
            this.stockStatus === StockStatus.LIMITED;
    }

    toString() {
        return `${this.getCategoryEmoji()} ${this.name} - ${this.getFormattedPrice()} تومان`;
    }
}