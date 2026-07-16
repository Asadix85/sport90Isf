/**
 * ExerciseBall - توپ بدنسازی
 */
class ExerciseBall extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    diameter,          // قطر به سانتی‌متر (۶۵، ۷۵، ۸۵)
                    hasSpikes = false, // خاردار یا ساده
                    maxWeight = 150,   // حداکثر وزن تحمل (کیلوگرم)
                    color = 'آبی'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.EXERCISE_BALL,
            brand,
            colors
        });

        this.diameter = diameter;
        this.hasSpikes = hasSpikes;
        this.maxWeight = maxWeight;
        this.color = color;
        this.material = 'PVC';
    }

    getDiameterLabel() {
        return `${this.diameter} سانتی‌متر`;
    }

    getTypeLabel() {
        return this.hasSpikes ? 'خاردار' : 'ساده';
    }

    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getDiameterLabel()}) - ${this.getFormattedPrice()} تومان`;
    }
}