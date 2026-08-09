
class VolleyballBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.MIKASA,
                    colors = [],
                    size = 5,
                    material = undefined,
                    weight = 270,
                    circumference = 65
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.VOLLEYBALL_BALL,
            brand,
            colors,
            size,
            material,
            sport: 'والیبال',
            weight,
            circumference
        });
    }
}

window.VolleyballBall = VolleyballBall;
