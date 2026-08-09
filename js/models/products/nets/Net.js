
class Net extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.NETS,
                    brand = undefined,
                    colors = [],
                    material = 'نخ پلی‌استر',
                    dimensions = undefined
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
        this.dimensions = dimensions;
    }

    getDimensionsLabel() {
        return this.dimensions || '';
    }
}
