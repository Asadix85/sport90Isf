
class Short extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.NIKE,
                    colors = [],
                    size = ClothingSize.M,
                    gender = Gender.MEN,
                    material = 'پلی‌استر'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.CLOTHING,
            brand,
            colors,
            size,
            gender,
            material
        });
    }
}

window.Short = Short;
