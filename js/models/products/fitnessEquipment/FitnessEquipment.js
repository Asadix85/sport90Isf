/**
 * کلاس FitnessEquipment - پایه تجهیزات بدنسازی
 */
class FitnessEquipment extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = Category.FITNESS,
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'فولاد',
                    weight = 0,
                    isPortable = true
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
        this.weight = weight;
        this.isPortable = isPortable;
    }
}