
class FootballBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.MOLTEN,
                    colors = [],
                    size = 5,
                    material = undefined,
                    weight = 420,
                    circumference = 69,
                    footballType = FootballType.MATCH
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.FOOTBALL_BALL,
            brand,
            colors,
            size,
            material,
            sport: 'فوتبال',
            weight,
            circumference
        });

        this.footballType = footballType;
    }

    getFootballTypeName() {
        return this.footballType.label || this.footballType;
    }
}
