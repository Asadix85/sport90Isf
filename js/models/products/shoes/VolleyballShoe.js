/**
 * کلاس VolleyballShoe - کفش والیبال
 */
class VolleyballShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.ASICS,
                    colors = [],
                    size = ShoeSize.SIZE_42,
                    gender = Gender.UNISEX,
                    color = 'سفید-آبی',
                    material = 'مش',
                    sole = 'Non-marking',
                    cushioning = 'Gel'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.VOLLEYBALL_SHOE,
            brand,
            colors,
            size,
            gender,
            color,
            material
        });

        this.sole = sole;
        this.cushioning = cushioning;
    }
}