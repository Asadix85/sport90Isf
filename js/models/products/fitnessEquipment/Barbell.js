
class Barbell extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = 20,
                    material = 'فولاد'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.FITNESS,
            brand,
            colors,
            weight,
            material
        });
    }
}

window.Barbell = Barbell;
