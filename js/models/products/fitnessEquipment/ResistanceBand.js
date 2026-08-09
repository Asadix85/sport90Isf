
class ResistanceBand extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = undefined,
                    material = 'لاستیک',
                    resistanceLevel = 'متوسط'
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

        this.resistanceLevel = resistanceLevel;
    }
}

window.ResistanceBand = ResistanceBand;
