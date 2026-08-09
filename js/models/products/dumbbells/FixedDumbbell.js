
class FixedDumbbell extends Dumbbell {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = 10,
                    material = 'آهن روکش‌دار'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.DUMBBELL,
            brand,
            colors,
            weight,
            material
        });
    }
}

window.FixedDumbbell = FixedDumbbell;
