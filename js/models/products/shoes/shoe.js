
class Shoe extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.FOOTBALL_SHOE,
                    brand = undefined,
                    colors = [],
                    shoeSize = ShoeSize.SIZE_42,
                    terrain = undefined,
                    gender = undefined
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

        this.shoeSize = shoeSize;
        this.terrain = terrain;
        this.gender = gender;
    }

    getShoeSizeLabel() {
        return `${this.shoeSize}`;
    }
}

window.shoe = shoe;
