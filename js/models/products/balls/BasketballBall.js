/**
 * BasketballBall - توپ بسکتبال
 * ارث‌بری از کلاس Ball
 */
class BasketballBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.SPALDING,
                    colors = [],
                    size = 7,              // سایز استاندارد: ۷ مردان، ۶ زنان، ۵ نوجوانان
                    material = BallMaterial.COMPOSITE,
                    surface = 'composite', // leather, composite, rubber
                    indoor = true,         // داخل سالن یا بیرون
                    weight = 620,          // وزن به گرم
                    circumference = 75,    // محیط به سانتی‌متر
                    category = Category.BASKETBALL_BALL
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
            sport: 'بسکتبال',
            weight
        });

        this.surface = surface;
        this.indoor = indoor;
        this.circumference = circumference;
    }

    /**
     * دریافت برچسب سطح توپ
     */
    getSurfaceLabel() {
        const labels = {
            'leather': 'چرم طبیعی',
            'composite': 'کامپوزیت',
            'rubber': 'لاستیک'
        };
        return labels[this.surface] || this.surface;
    }

    /**
     * دریافت برچسب سایز توپ
     */
    getSizeLabel() {
        const labels = {
            7: 'سایز ۷ (مردان)',
            6: 'سایز ۶ (زنان)',
            5: 'سایز ۵ (نوجوانان)',
            4: 'سایز ۴ (کودکان)',
            3: 'سایز ۳ (خردسالان)'
        };
        return labels[this.size] || `سایز ${this.size}`;
    }

    /**
     * مناسب برای داخل سالن یا بیرون
     */
    getEnvironmentLabel() {
        return this.indoor ? 'داخل سالن' : 'بیرون از سالن';
    }

    /**
     * بازنویسی متد toString
     */
    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getSizeLabel()}) - ${this.getFormattedPrice()} تومان`;
    }
}