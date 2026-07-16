/**
 * Ball - کلاس پایه توپ‌ها
 * ارث‌بری از کلاس Product
 */
class Ball extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category,
                    brand = Brand.ADIDAS,
                    colors = [],
                    size,              // سایز توپ (مثلاً ۵ برای فوتبال، ۷ برای بسکتبال)
                    material,          // جنس توپ (چرم، پی‌یو، پی‌وی‌سی، ...)
                    sport,             // ورزش مربوطه (فوتبال، بسکتبال، ...)
                    weight = 450,      // وزن به گرم
                    circumference = 70 // محیط به سانتی‌متر
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category,
            brand,
            colors
        });

        this.size = size;
        this.material = material;
        this.sport = sport;
        this.weight = weight;
        this.circumference = circumference;
    }

    /**
     * دریافت برچسب جنس توپ
     */
    getMaterialName() {
        return this.material.label || this.material;
    }

    /**
     * دریافت وزن توپ
     */
    getWeightLabel() {
        return `${this.weight} گرم`;
    }

    /**
     * دریافت محیط توپ
     */
    getCircumferenceLabel() {
        return `${this.circumference} سانتی‌متر`;
    }
}