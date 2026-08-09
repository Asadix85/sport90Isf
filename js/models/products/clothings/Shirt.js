
class Shirt extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ADIDAS,
                    colors = [],
                    size = ClothingSize.L,
                    gender = Gender.MEN,
                    material = 'پلی‌استر',
                    sleeveLength = 'کوتاه'
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

        this.sleeveLength = sleeveLength;
    }

    getSleeveLengthLabel() {
        return this.sleeveLength;
    }
}

window.Shirt = Shirt;
