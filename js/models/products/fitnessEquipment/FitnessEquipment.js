
class FitnessEquipment extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.FITNESS,
                    brand = undefined,
                    colors = [],
                    weight = undefined,
                    material = undefined
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category,
            brand,
            colors
        });

        this.weight = weight;
        this.material = material;
    }

    getWeightLabel() {
        return this.weight ? `${this.weight} کیلوگرم` : '';
    }
}

window.FitnessEquipment = FitnessEquipment;
