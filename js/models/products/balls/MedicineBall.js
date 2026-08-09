
class MedicineBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    size = 30,
                    material = undefined,
                    weight = 3000,
                    circumference = 90
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.EXERCISE_BALL,
            brand,
            colors,
            size,
            material,
            sport: 'بدنسازی',
            weight,
            circumference
        });
    }
}

window.MedicineBall = MedicineBall;
