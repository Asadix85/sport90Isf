/**
 * کلاس Dumbbell - پایه همه دمبل‌ها
 */
class Dumbbell extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = Category.DUMBBELL,
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight,          // وزن به کیلوگرم
                    unit = 'جفت',    // واحد: جفت، عدد
                    material = 'چدن',
                    handleType = 'معمولی'
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

        this.weight = weight;
        this.unit = unit;
        this.material = material;
        this.handleType = handleType;
    }

    getWeightLabel() {
        return `${this.weight} کیلوگرم`;
    }

    getUnitLabel() {
        return this.unit === 'جفت' ? 'جفتی' : 'عددی';
    }
}