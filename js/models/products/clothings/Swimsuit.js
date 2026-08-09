
class Swimsuit extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.SPEEDO,
                    colors = [],
                    size = undefined,
                    gender = Gender.MEN,
                    material = 'لکرا'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.SWIMMING,
            brand,
            colors,
            size,
            gender,
            material
        });
    }
}

window.Swimsuit = Swimsuit;
