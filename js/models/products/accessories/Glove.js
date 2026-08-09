
class Glove extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ADIDAS,
                    colors = [],
                    material = 'چرم مصنوعی',
                    gloveType = 'دروازه‌بانی'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.GLOVES,
            brand,
            colors,
            material
        });

        this.gloveType = gloveType;
    }
}
