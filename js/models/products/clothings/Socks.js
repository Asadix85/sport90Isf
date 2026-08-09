
class Socks extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ADIDAS,
                    colors = [],
                    size = undefined,
                    gender = Gender.UNISEX,
                    material = 'نخ پنبه‌ای',
                    length = 'کوتاه'
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

        this.length = length;
    }
}
