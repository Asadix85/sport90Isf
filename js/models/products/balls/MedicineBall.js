/**
 * MedicineBall - مدیسین بال (توپ طبی)
 */
class MedicineBall extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    weight,            // وزن به کیلوگرم
                    diameter = 35,     // قطر به سانتی‌متر
                    hasHandle = false, // دسته دار
                    color = 'مشکی'
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

        this.weight = weight;
        this.diameter = diameter;
        this.hasHandle = hasHandle;
        this.color = color;
        this.material = 'لاستیک';
    }

    getWeightLabel() {
        return `${this.weight} کیلوگرم`;
    }

    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getWeightLabel()}) - ${this.getFormattedPrice()} تومان`;
    }
}