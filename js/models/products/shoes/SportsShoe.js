
class SportsShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.NIKE,
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
            category: Category.SPORTS_SHOE,
            brand,
            colors,
            shoeSize,
            terrain,
            gender
        });
    }
}

window.SportsShoe = SportsShoe;
