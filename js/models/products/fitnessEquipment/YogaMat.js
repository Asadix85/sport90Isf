
class YogaMat extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.LEDRA,
                    colors = [],
                    weight = 1,
                    material = 'فوم',
                    thickness = 6
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

        this.thickness = thickness;
    }
}
