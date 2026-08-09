
class BasketballBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.SPALDING,
                    colors = [],
                    size = 7,
                    material = undefined,
                    weight = 600,
                    circumference = 75
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.BASKETBALL_BALL,
            brand,
            colors,
            size,
            material,
            sport: 'بسکتبال',
            weight,
            circumference
        });
    }
}

window.BasketballBall = BasketballBall;
