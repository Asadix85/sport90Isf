/**
 * کلاس Glove - دستکش‌ها
 */
class Glove extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'چرم',
                    isWearable = true,
                    size = 'متوسط',
                    type = 'ورزشی',       // ورزشی، گلری، بوکس، رزمی
                    hasPadding = true,
                    fingerType = 'کامل'   // کامل، نیمه انگشتی
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.GLOVES,
            brand,
            colors,
            material,
            isWearable,
            size
        });

        this.type = type;
        this.hasPadding = hasPadding;
        this.fingerType = fingerType;
    }
}