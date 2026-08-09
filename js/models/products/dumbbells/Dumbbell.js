
class Dumbbell extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.DUMBBELL,
                    brand = undefined,
                    colors = [],
                    weight = 5,
                    material = 'آهن'
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
        return `${this.weight} کیلوگرم`;
    }
}
