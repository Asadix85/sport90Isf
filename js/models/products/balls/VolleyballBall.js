/**
 * VolleyballBall - توپ والیبال
 * ارث‌بری از کلاس Ball
 */
class VolleyballBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.MIKASA,
                    colors = [],
                    size = 5,              // سایز استاندارد ۵
                    material = BallMaterial.PU,
                    weight = 260,          // وزن به گرم
                    circumference = 65,    // محیط به سانتی‌متر
                    type = 'استاندارد',   // استاندارد، ساحلی
                    panelCount = 18,       // تعداد تکه‌ها
                    category = Category.VOLLEYBALL_BALL
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category,
            brand,
            colors,
            size,
            material,
            sport: 'والیبال',
            weight
        });

        this.circumference = circumference;
        this.type = type;
        this.panelCount = panelCount;
    }

    /**
     * دریافت برچسب نوع توپ والیبال
     */
    getTypeLabel() {
        const labels = {
            'standard': 'استاندارد',
            'beach': 'ساحلی'
        };
        return labels[this.type] || this.type;
    }

    /**
     * دریافت تعداد تکه‌های توپ
     */
    getPanelLabel() {
        return `${this.panelCount} تکه`;
    }

    /**
     * بازنویسی متد toString
     */
    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getTypeLabel()}) - ${this.getFormattedPrice()} تومان`;
    }
}