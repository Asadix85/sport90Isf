/**
 * کلاس Accessory - پایه لوازم جانبی
 */
class Accessory extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = Category.ACCESSORIES,
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'پلاستیک',
                    isWearable = false,
                    size = 'یک سایز'
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

        this.material = material;
        this.isWearable = isWearable;
        this.size = size;
    }
}