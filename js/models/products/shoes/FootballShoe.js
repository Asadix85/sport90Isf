
class FootballShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ADIDAS,
                    colors = [],
                    shoeSize = 42,
                    terrain = Terrain.NATURAL,
                    gender = undefined,
                    studType = 'FG'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.FOOTBALL_SHOE,
            brand,
            colors,
            shoeSize,
            terrain,
            gender
        });

        this.studType = studType;
    }

    getStudTypeName() {
        return this.studType;
    }
}

window.FootballShoe = FootballShoe;
