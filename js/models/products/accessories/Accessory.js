
class Accessory extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.ACCESSORIES,
                    brand = undefined,
                    colors = [],
                    material = undefined
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
    }

    getMaterialName() {
        return this.material || '';
    }
}

window.Accessory = Accessory;
