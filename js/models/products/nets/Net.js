/**
 * کلاس Net - پایه تور و تجهیزات زمین
 */
class Net extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category = Category.NETS,
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'نخ',
                    size = 'استاندارد',
                    isPortable = false
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
        this.size = size;
        this.isPortable = isPortable;
    }
}