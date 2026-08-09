
class Racket extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.YONEX,
                    colors = [],
                    material = 'کربن',
                    racketType = 'بادمینتون'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.RACKET,
            brand,
            colors,
            material
        });

        this.racketType = racketType;
    }
}
