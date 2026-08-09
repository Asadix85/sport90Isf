
class PullUpBar extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = undefined,
                    material = 'فولاد',
                    maxWeight = 150
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

        this.maxWeight = maxWeight;
    }
}

window.PullUpBar = PullUpBar;
