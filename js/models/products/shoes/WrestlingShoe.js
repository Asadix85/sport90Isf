
class WrestlingShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ASICS,
                    colors = [],
                    shoeSize = 42,
                    terrain = undefined,
                    gender = undefined
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.WRESTLING_SHOE,
            brand,
            colors,
            shoeSize,
            terrain,
            gender
        });
    }
}

window.WrestlingShoe = WrestlingShoe;
